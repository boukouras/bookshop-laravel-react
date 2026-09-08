<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Http\Requests\StoreCouponRequest;
use App\Http\Requests\UpdateCouponRequest;
use App\Models\Product;
use App\Models\Tag;
use App\Support\AdminListQuery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('admin/coupons/coupons', [
            'coupons' => Coupon::paginate(20),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCouponRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        //
        return Inertia::render('admin/coupons/coupons-view', [
            'coupon' => $coupon,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon)
    {
        //
        return Inertia::render('admin/coupons/coupons-view', [
            'coupon' => $coupon,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {
        //
    }

    public function apply(
        Request $request,
        CartService $cartService,
    ): JsonResponse {
        $validated = $request->validate([
            'promo_code' => ['required', 'string', 'max:50'],
        ]);

        $cart = $cartService->getCart($request);

        if (!$cart || $cart->items->isEmpty()) {
            throw ValidationException::withMessages([
                'promo_code' => 'Your cart is empty.',
            ]);
        }

        $subtotal = $cart->items->sum(function ($item) {
            return (float) $item->product->final_price * $item->quantity;
        });

        $coupon = Coupon::query()
            ->where('code', strtoupper(trim($validated['promo_code'])))
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

        if (
            $request->user() &&
            $coupon->per_user_limit !== null
        ) {
            $userUsageCount = $coupon->orders()
                ->where('user_id', $request->user()->id)
                ->count();

            if ($userUsageCount >= $coupon->per_user_limit) {
                throw ValidationException::withMessages([
                    'promo_code' => 'You have reached the usage limit for this coupon.',
                ]);
            }
        }

        if (
            $coupon->min_order_amount !== null &&
            $subtotal < (float) $coupon->min_order_amount
        ) {
            throw ValidationException::withMessages([
                'promo_code' => sprintf(
                    'This coupon requires a minimum order of €%s.',
                    number_format(
                        (float) $coupon->min_order_amount,
                        2,
                        ',',
                        '.'
                    )
                ),
            ]);
        }

        $discount = $coupon->calculateDiscount($subtotal);

        if ($discount <= 0) {
            throw ValidationException::withMessages([
                'promo_code' => 'This coupon cannot be applied to your order.',
            ]);
        }

        return response()->json([
            'coupon' => $coupon,
            'discount' => $discount,
        ]);
    }
}
