<?php

namespace App\Services;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartService
{
    public function getCart(Request $request): ?Cart
    {
        if ($request->user()) {
            return Cart::query()
                ->where('user_id', $request->user()->id)
                ->where('status', 'active')
                ->with(
                    'items.product',
                    'items.product.authors',
                    'items.product.publishers',
                    'items.product.languages',
                    'items.product.tags',
                    'items.product.images',
                    'items.product.reviews',
                    'items.product.categories',
                )
                ->first();
        }

        $guestToken = $request->cookie('cart_token');

        if (!$guestToken) {
            return null;
        }

        return Cart::query()
            ->where('guest_token', $guestToken)
            ->where('status', 'active')
            ->with(
                'items.product',
                'items.product.authors',
                'items.product.publishers',
                'items.product.languages',
                'items.product.tags',
                'items.product.images',
                'items.product.reviews',
                'items.product.categories',
            )
            ->first();
    }
}