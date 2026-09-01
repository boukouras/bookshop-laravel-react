<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreCartRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart, Request $request)
    {
        //
        $cart = $this->getCart($request);
        $cart->load(['items.product',]);
        return inertia('client/cart/cart', ['cart' => $cart,]);

    }

    public function add(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'product_id' => [
                'required',
                'integer',
                'exists:products,id'
            ],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $product = Product::findOrFail($data['product_id']);
        // Product must be active.
        abort_unless($product->status === 'active', 404);
        // Check stock.
        if ($product->stock !== null) {
            abort_if($product->stock < $data['quantity'], 422, 'Not enough stock available.');
        }
        $cart = $this->getCart($request);
        $item = $cart->items()->where('product_id', $product->id)->first();
        if ($item) {
            $newQuantity = $item->quantity + $data['quantity'];
            if ($product->stock !== null && $newQuantity > $product->stock) {
                abort(422, 'Not enough stock available.');
            }
            $item->update(['quantity' => $newQuantity,]);
        } else {
            $cart->items()->create(['product_id' => $product->id, 'quantity' => $data['quantity'],]);
        }
        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        //
    }

    public function updateItem(Request $request, int $item): RedirectResponse
    {
        $data = $request->validate(['quantity' => ['required', 'integer', 'min:1'],]);
        $cart = $this->getCart($request);
        $cartItem = $cart->items()->with('product')->findOrFail($item);
        $product = $cartItem->product;
        if ($product->stock !== null && $data['quantity'] > $product->stock) {
            abort(422, 'Not enough stock available.');
        }
        $cartItem->update(['quantity' => $data['quantity'],]);
        return back();
    }

    public function removeItem(Request $request, int $item): RedirectResponse
    {
        $cart = $this->getCart($request);
        $cart->items()->findOrFail($item)->delete();
        return back();
    }

    public function clear(Request $request): RedirectResponse
    {
        $cart = $this->getCart($request);
        $cart->items()->delete();
        return back();
    }

    protected function getCart(Request $request): Cart
    {
        if (auth()->check()) {
            return Cart::firstOrCreate(['user_id' => auth()->id(), 'status' => 'active',]);
        }
        $guestToken = $request->cookie('cart_token');
        if (!$guestToken) {
            $guestToken = (string) Str::uuid();
        }
        $cart = Cart::firstOrCreate(['guest_token' => $guestToken, 'status' => 'active',]);
        if (!$request->hasCookie('cart_token')) {
            cookie()->queue(cookie('cart_token', $guestToken, 60 * 24 * 30, '/', null, app()->environment('production'), true, false, 'lax'));
        }
        return $cart;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
