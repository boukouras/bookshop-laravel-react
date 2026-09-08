<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderAddress;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\Shipment;
use App\Models\ShippingMethod;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CheckoutService
{
    public function __construct(
        private readonly CartService $cartService,
    ) {
    }

    public function createOrder(
        Request $request,
        array $data,
    ): Order {
        return DB::transaction(function () use ($request, $data) {
            $cart = $this->cartService->getCart($request);

            if (!$cart || $cart->items->isEmpty()) {
                throw ValidationException::withMessages([
                    'cart' => 'Your cart is empty.',
                ]);
            }

            /*
             * Lock products while checking stock and creating the order.
             */
            $cartItems = $cart->items;

            $subtotal = 0;

            $products = [];

            foreach ($cartItems as $cartItem) {
                $product = Product::query()
                    ->whereKey($cartItem->product_id)
                    ->lockForUpdate()
                    ->first();

                if (!$product || !$product->isActive()) {
                    throw ValidationException::withMessages([
                        'cart' => "The product \"{$cartItem->product->title}\" is no longer available.",
                    ]);
                }

                if (
                    $product->stock !== null &&
                    $cartItem->quantity > $product->stock
                ) {
                    throw ValidationException::withMessages([
                        'cart' => "There is not enough stock for \"{$product->title}\".",
                    ]);
                }

                $price = $product->final_price;
                $amount = round($price * $cartItem->quantity, 2);

                $subtotal += $amount;

                $products[$cartItem->id] = [
                    'product' => $product,
                    'price' => $price,
                    'amount' => $amount,
                    'quantity' => $cartItem->quantity,
                ];
            }

            /*
             * Shipping method
             */
            $shippingMethod = ShippingMethod::query()
                ->whereKey($data['shipping_method_id'])
                ->where('status', 'active')
                ->first();

            if (!$shippingMethod) {
                throw ValidationException::withMessages([
                    'shipping_method_id' => 'The selected shipping method is no longer available.',
                ]);
            }

            $shippingAmount = $shippingMethod->calculatePrice($subtotal);

            /*
             * Coupon
             */
            $coupon = null;
            $discountAmount = 0;

            if (!empty($data['promo_code'])) {
                $coupon = Coupon::query()
                    ->whereRaw('LOWER(code) = ?', [
                        strtolower($data['promo_code']),
                    ])
                    ->lockForUpdate()
                    ->first();

                if (!$coupon || !$coupon->isActive()) {
                    throw ValidationException::withMessages([
                        'promo_code' => 'The selected coupon is invalid or expired.',
                    ]);
                }

                if (!$coupon->hasAvailableUses()) {
                    throw ValidationException::withMessages([
                        'promo_code' => 'This coupon has reached its usage limit.',
                    ]);
                }

                $discountAmount = $coupon->calculateDiscount($subtotal);

                if ($discountAmount <= 0) {
                    throw ValidationException::withMessages([
                        'promo_code' => 'This coupon cannot be applied to your order.',
                    ]);
                }
            }

            /*
             * Payment method
             */
            $paymentMethod = PaymentMethod::query()
                ->whereKey($data['payment_method_id'])
                ->where('status', 'active')
                ->first();

            if (!$paymentMethod) {
                throw ValidationException::withMessages([
                    'payment_method_id' => 'The selected payment method is no longer available.',
                ]);
            }

            $paymentAmount = $paymentMethod->cost;

            $total = round(
                $subtotal - $discountAmount + $shippingAmount + $paymentAmount,
                2
            );

            /*
             * Create order
             */
            $order = Order::create([
                'user_id' => $request->user()?->id,
                'coupon_id' => $coupon?->id,
                'shipping_method_id' => $shippingMethod->id,
                'subtotal_amount' => $subtotal,
                'discount_amount' => $discountAmount,
                'shipping_amount' => $shippingAmount,
                'payment_amount' => $paymentAmount,
                'amount' => $total,
                'currency' => 'EUR',
                'status' => 'pending',
            ]);

            /*
             * Create order items and decrease stock.
             */
            foreach ($products as $item) {
                $item['product']->decrement(
                    'stock',
                    $item['quantity']
                );

                $order->items()->create([
                    'product_id' => $item['product']->id,
                    'product_name' => $item['product']->title,
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'amount' => $item['amount'],
                ]);
            }

            /*
             * Shipping address
             */
            $order->addresses()->create([
                'type' => 'shipping',
                'country' => $data['country'],
                'city' => $data['city'],
                'address' => $data['address'],
                'number' => $data['number'],
                'postal_code' => $data['postal_code'],
            ]);

            /*
             * For now billing address is the same as shipping.
             */
            $order->addresses()->create([
                'type' => 'billing',
                'country' => $data['country'],
                'city' => $data['city'],
                'address' => $data['address'],
                'number' => $data['number'],
                'postal_code' => $data['postal_code'],
            ]);

            /*
             * Create shipment.
             */
            $order->shipments()->create([
                'status' => 'pending',
            ]);

            /*
             * Create pending payment.
             *
             * Actual payment processing will be connected
             * to the selected provider separately.
             */
            $order->payments()->create([
                'payment_method_id' => $paymentMethod->id,
                'amount' => $total,
                'currency' => 'EUR',
                'status' => 'pending',
            ]);

            $order->info()->create([
                'email' => $data['email'],
                'fname' => $data['firstName'],
                'lname' => $data['lastName'],
                'phone' => $data['phone']
            ]);
            /*
             * Coupon usage.
             */
            if ($coupon) {
                $coupon->increment('used_count');
            }

            /*
             * Convert cart.
             *
             * We keep the cart record and remove its items.
             */
            $cart->items()->delete();

            $cart->update([
                'status' => 'converted',
            ]);

            return $order;
        });
    }
}