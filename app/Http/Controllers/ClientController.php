<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Cart;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Publisher;
use App\Models\ShippingMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Support\AdminListQuery;
use App\Models\Category;
use App\Models\Product;

class ClientController extends Controller
{
    //
    public function home(): Response
    {
        $products = Product::where('is_featured', true)
            ->with([
                'authors',
                'publishers',
                'languages',
                'tags',
                'images',
                'reviews.user',
                'categories',
            ])
            ->get();
        return Inertia::render('client/welcome', [
            'featureds' => $products,
        ]);
    }
    public function checkout(Request $request): Response
    {
        if ($request->user()) {
            $cart = Cart::firstOrCreate([
                'user_id' => $request->user()->id,
                'status' => 'active',
            ]);
        } else {
            $guestToken = $request->cookie('cart_token');
            if (!$guestToken) {
                $guestToken = (string) Str::uuid();
                cookie()->queue(
                    cookie('cart_token', $guestToken, 60 * 24 * 30, '/', null, app()->environment('production'), true, false, 'lax')
                );
            }

            $cart = Cart::firstOrCreate([
                'guest_token' => $guestToken,
                'status' => 'active',
            ]);
        }

        $cart->load([
            'items.product',
            'items.product.authors',
            'items.product.publishers',
            'items.product.languages',
            'items.product.tags',
            'items.product.images',
            'items.product.reviews',
            'items.product.categories',
        ]);

        $shippinhMethod = ShippingMethod::get();
        $paymentMethod = PaymentMethod::get();

        return Inertia::render('client/cart/checkout', [
            'cart' => $cart,
            'paymentMethods' => $paymentMethod,
            'shippingMethods' => $shippinhMethod
        ]);
    }
    public function completed(Order $order): Response
    {
        $order->load([
            'addresses',
            'info',
            'user',
            'coupon',
            'shippingMethod',
            'items',
            'items.product',
            'payments',
            'payments.paymentMethod',
            'shipments',
        ]);

        return Inertia::render('client/cart/completed', [
            'order' => $order,
        ]);
    }
    public function cart(Request $request): Response
    {
        if ($request->user()) {
            $cart = Cart::firstOrCreate([
                'user_id' => $request->user()->id,
                'status' => 'active',
            ]);
        } else {
            $guestToken = $request->cookie('cart_token');
            if (!$guestToken) {
                $guestToken = (string) Str::uuid();
                cookie()->queue(
                    cookie('cart_token', $guestToken, 60 * 24 * 30, '/', null, app()->environment('production'), true, false, 'lax')
                );
            }

            $cart = Cart::firstOrCreate([
                'guest_token' => $guestToken,
                'status' => 'active',
            ]);
        }

        $cart->load([
            'items.product',
            'items.product.authors',
            'items.product.publishers',
            'items.product.languages',
            'items.product.tags',
            'items.product.images',
            'items.product.reviews',
            'items.product.categories',
        ]);

        return Inertia::render('client/cart/cart', [
            'cart' => $cart
        ]);
    }
    public function category(string $category): Response
    {
        $category = Category::whereNull('parent_id')
            ->where('slug', $category)
            ->with([
                'products',
                'products.reviews',
                'products.tags',
                'products.orderItems',
                'products.images'
            ])
            ->firstOrFail();
        $categories = Category::get();
        return Inertia::render('client/category/category', [
            'category' => $category,
            'categories' => $categories,
        ]);
    }

    public function categories(Category $categories): Response
    {
        $categories = Category::with([
            'products',
            'products.reviews',
            'products.tags',
            'products.orderItems',
            'products.images'
        ])->get();
        return Inertia::render('client/category/categories', [
            'categories' => $categories,
        ]);
    }

    public function products(Product $products): Response
    {
        $products = Product::with([
            'categories',
            'authors',
            'languages',
            'tags',
            'images',
            'reviews.user',
            'publishers',
        ])->get();
        return Inertia::render('client/products/products', [
            'products' => $products
        ]);
    }

    public function product(string $product): Response
    {
        $product = Product::where('slug', $product)
            ->with([
                'authors',
                'publishers',
                'languages',
                'tags',
                'images',
                'reviews.user',
                'categories',
            ])
            ->firstOrFail();

        $liked = auth()->check()
            ? auth()->user()
                ->wishlists()
                ->where('products.id', $product->id)
                ->exists()
            : false;
        return Inertia::render('client/products/product', [
            'product' => $product,
            'liked' => $liked,
            'type' => 'products'
        ]);
    }

    public function search(Request $request): Response
    {
        $query = trim($request->string('q')->toString());
        $products = Product::query()->where('status', 'active')->when($query !== '', function ($queryBuilder) use ($query) {
            $queryBuilder->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")->orWhere('description', 'like', "%{$query}%")->orWhere('isbn', 'like', "%{$query}%")->orWhereHas('authors', function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%");
                })->orWhereHas('publishers', function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%");
                })->orWhereHas('tags', function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%");
                });
            });
        })->with([
                    'authors',
                    'publishers',
                    'languages',
                    'tags',
                    'reviews',
                    'images',
                    'categories'
                ])->paginate(20)->withQueryString();

        return Inertia::render('client/search/search', [
            'products' => $products,
            'query' => $query,
        ]);
    }
    public function authors(Author $authors): Response
    {
        $authors = Author::with([
            'products',
        ])->paginate(20);

        return Inertia::render('client/authors/authors', [
            'authors' => $authors,
        ]);
    }
    public function author(Author $author): Response
    {
        $author->load([
            'products',
            'products.categories',
            'products.authors',
            'products.languages',
            'products.tags',
            'products.images',
            'products.reviews.user',
            'products.publishers',
        ]);
        return Inertia::render('client/authors/author', [
            'author' => $author,
        ]);
    }
    public function publishers(Publisher $publishers): Response
    {
        $publishers = Publisher::with([
            'products',
        ])->paginate(20);
        return Inertia::render('client/publishers/publishers', [
            'publishers' => $publishers,
        ]);
    }

    public function publisher(Publisher $publisher): Response
    {
        $publisher->load([
            'products',
            'products.categories',
            'products.authors',
            'products.languages',
            'products.tags',
            'products.images',
            'products.reviews.user',
            'products.publishers',
        ]);
        return Inertia::render('client/publishers/publisher', [
            'publisher' => $publisher,
        ]);
    }
    public function terms(): Response
    {
        return Inertia::render('client/legal/terms');
    }
    public function privacy(): Response
    {
        return Inertia::render('client/legal/privacy');
    }

    public function gdpr(): Response
    {
        return Inertia::render('client/legal/gdpr');
    }

    public function data(): Response
    {
        return Inertia::render('client/legal/data');
    }

    public function contact(): Response
    {
        return Inertia::render('client/company/contact');
    }

    public function about(): Response
    {
        return Inertia::render('client/company/about');
    }

    public function team(): Response
    {
        return Inertia::render('client/company/team');
    }

    public function career(): Response
    {
        return Inertia::render('client/company/career');
    }
}
