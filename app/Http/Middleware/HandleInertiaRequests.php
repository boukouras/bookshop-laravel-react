<?php

namespace App\Http\Middleware;
use App\Models\Category;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'cart' => fn () => $this->getCart($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'categories' => fn() => Category::get()
        ];
    }

    protected function getCart(Request $request): ?Cart {
        if (auth()->check()) {
            return Cart::query()->where('user_id', auth()->id())->where('status', 'active')->with('items.product')->first();
        }
        $guestToken = $request->cookie('cart_token');
        if (!$guestToken) {return null;}
        return Cart::query()->where('guest_token', $guestToken)->where('status', 'active')->with('items.product')->first();
    }
}
