<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'IsAdmin'])->group(function () {
    Route::prefix('/admin')->group(function () {
        Route::prefix('/catalog')->group(function () {
            Route::prefix('/products')->name('adminProducts')->group(function () {
                Route::get('/', [ProductController::class, 'index'])->name('Index');
                Route::get('/create', [ProductController::class, 'create'])->name('Create');
                Route::post('/create', [ProductController::class, 'store'])->name('Store');
                Route::get('/{product}', [ProductController::class, 'show'])->name('Show');
                Route::put('/{product}', [ProductController::class, 'update'])->name('Update');
                Route::delete('/{product}', [ProductController::class, 'destroy'])->name('Destroy');
            });
            Route::prefix('/categories')->name('adminCategories')->group(function () {
                Route::get('/', [CategoryController::class, 'index'])->name('Index');
                Route::get('/create', [CategoryController::class, 'create'])->name('Create');
                Route::post('/create', [CategoryController::class, 'store'])->name('Store');
                Route::get('/{category}', [CategoryController::class, 'show'])->name('Show');
                Route::put('/{category}', [CategoryController::class, 'update'])->name('Update');
                Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('Destroy');
            });
            Route::prefix('/tags')->name('adminTags')->group(function () {
                Route::get('/', [TagController::class, 'index'])->name('Index');
                Route::get('/create', [TagController::class, 'create'])->name('Create');
                Route::post('/create', [TagController::class, 'store'])->name('Store');
                Route::get('/{tag}', [TagController::class, 'show'])->name('Show');
                Route::put('/{tag}', [TagController::class, 'update'])->name('Update');
                Route::delete('/{tag}', [TagController::class, 'destroy'])->name('Destroy');
            });
            Route::prefix('/authors')->name('adminAuthors')->group(function () {
                Route::get('/', [AuthorController::class, 'index'])->name('Index');
                Route::get('/create', [AuthorController::class, 'create'])->name('Create');
                Route::post('/create', [AuthorController::class, 'store'])->name('Store');
                Route::get('/{author}', [AuthorController::class, 'show'])->name('Show');
                Route::put('/{author}', [AuthorController::class, 'update'])->name('Update');
                Route::delete('/{author}', [AuthorController::class, 'destroy'])->name('Destroy');
            });
            Route::prefix('/publishers')->name('adminPublishers')->group(function () {
                Route::get('/', [PublisherController::class, 'index'])->name('Index');
                Route::get('/create', [PublisherController::class, 'create'])->name('Create');
                Route::post('/create', [PublisherController::class, 'store'])->name('Store');
                Route::get('/{publisher}', [PublisherController::class, 'show'])->name('Show');
                Route::put('/{publisher}', [PublisherController::class, 'update'])->name('Update');
                Route::delete('/{publisher}', [PublisherController::class, 'destroy'])->name('Destroy');
            });
            Route::prefix('/reviews')->name('adminReviews')->group(function () {
                Route::get('/', [ReviewController::class, 'index'])->name('Index');
                Route::get('/{review}', [ReviewController::class, 'show'])->name('Show');
                Route::get('/{review}/edit', [ReviewController::class, 'edit'])->name('Edit');
            });
        });
        Route::prefix('/sales')->group(function () {
            Route::prefix('/orders')->name('adminOrders')->group(function () {
                Route::get('/', [OrderController::class, 'index'])->name('Index');
                Route::get('/{order}', [OrderController::class, 'show'])->name('Show');
                Route::get('/{order}/edit', [OrderController::class, 'edit'])->name('Edit');
            });
            Route::prefix('/coupons')->name('adminCoupons')->group(function () {
                Route::get('/', [CouponController::class, 'index'])->name('Index');
                Route::get('/{coupon}', [CouponController::class, 'show'])->name('Show');
                Route::get('/{coupon}/edit', [CouponController::class, 'edit'])->name('Edit');
            });
        });
        Route::prefix('/customers')->group(function () {
            Route::prefix('/list')->name('adminCustomers')->group(function () {
                Route::get('/', [CustomerController::class, 'index'])->name('Index');
                Route::get('/{customer}', [CustomerController::class, 'show'])->name('Show');
                Route::get('/{customer}/edit', [CustomerController::class, 'edit'])->name('Edit');
            });
        });
    });
    Route::inertia('dashboard', 'admin/dashboard')->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::prefix('wishlist')->name('wishlist')->group(function () {
        Route::get('/', [WishlistController::class, 'show'])->name('Show');
        Route::post('/{product}', [WishlistController::class, 'store'])->name('Store');
        Route::delete('/{product}', [WishlistController::class, 'destroy'])->name('Delete');
    });
});

Route::prefix('cart')->name('cart')->group(function () {
    Route::get('/', [CartController::class, 'show'])->name('Show');
    Route::post('/items', [CartController::class, 'add'])->name('Add');
    Route::patch('/items/{item}', [CartController::class, 'updateItem'])->name('ItemsUpdate');
    Route::delete('/items/{item}', [CartController::class, 'removeItem'])->name('ItemsRemove');
    Route::delete('/', [CartController::class, 'clear'])->name('Clear');
});

Route::prefix('/')->group(function () {
    Route::get('/', [ClientController::class, 'home'])->name('home');
    Route::get('/search', [ClientController::class, 'search'])->name('search');
    Route::prefix('/publishers')->group(function () {
        Route::get('/', [ClientController::class, 'publishers'])->name('Publishers');
        Route::get('/{publisher:slug}', [ClientController::class, 'publisher'])->name('Publisher');
    });
    Route::prefix('/authors')->group(function () {
        Route::get('/', [ClientController::class, 'authors'])->name('Authors');
        Route::get('/{author:slug}', [ClientController::class, 'author'])->name('Author');
    });
    Route::prefix('/tags')->group(function () {
        Route::get('/', [ClientController::class, 'tags'])->name('Tags');
        Route::get('/{tag:slug}', [ClientController::class, 'tag'])->name('Tag');
    });
    Route::prefix('/categories')->group(function () {
        Route::get('/', [ClientController::class, 'categories'])->name('Categories');
        Route::get('/{category}', [ClientController::class, 'category'])->name('Category');
    });
    Route::prefix('/products')->group(function () {
        Route::get('/', [ClientController::class, 'products'])->name('Products');
        Route::get('/{product}', [ClientController::class, 'product'])->name('Product');
    });
    Route::get('/contact', [ClientController::class, 'contact'])->name('Contact');
    Route::get('/about', [ClientController::class, 'about'])->name('About');
    Route::get('/team', [ClientController::class, 'team'])->name('Team');
    Route::get('/career', [ClientController::class, 'career'])->name('Career');
    Route::get('/terms', [ClientController::class, 'terms'])->name('Terms');
    Route::get('/privacy', [ClientController::class, 'privacy'])->name('Privacy');
    Route::get('/gdpr', [ClientController::class, 'gdpr'])->name('GDPR');
    Route::get('/data', [ClientController::class, 'data'])->name('Data');
});

require __DIR__ . '/settings.php';
