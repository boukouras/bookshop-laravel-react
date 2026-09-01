<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Publisher;
use App\Models\Author;
use App\Models\Language;
use App\Models\Tag;
use App\Models\Address;
use App\Models\ProductImage;
use App\Models\Review;
use App\Models\Wishlist;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderAddress;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\ShippingMethod;
use App\Models\Shipment;
use App\Models\Coupon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->realData();
        /*
         |--------------------------------------------------------------------------
         | Users
         |--------------------------------------------------------------------------
         */
        $admin = User::factory()->admin()->create(['email' => 'testadmin@example.com']);
        $users = User::factory(50)->create();
        /*
        |--------------------------------------------------------------------------
        | Catalog
        |--------------------------------------------------------------------------
        */
        // Category::factory(15)->create();
        // Publisher::factory(20)->create();
        // Author::factory(50)->create();
        // Language::factory(8)->create();
        // Tag::factory(30)->create();
        /*
        |--------------------------------------------------------------------------
        | Products
        |--------------------------------------------------------------------------
        */
        // $products = Product::factory(200)->create();
        // foreach ($products as $product) {
        //     /*
        //     | Images
        //     */
        //     ProductImage::factory(rand(2, 5))->create(['product_id' => $product->id]);
        //     /*
        //     |--------------------------------------------------------------------------
        //     | Categories
        //     |--------------------------------------------------------------------------
        //     */
        //     $product->categories()->attach(Category::inRandomOrder()->take(rand(1, 3))->pluck('id'));
        //     /*
        //     | Authors
        //     */
        //     $product->authors()->attach(Author::inRandomOrder()->take(rand(1, 3))->pluck('id'));
        //     /*
        //     | Languages
        //     */
        //     $product->languages()->attach(Language::inRandomOrder()->take(rand(1, 2))->pluck('id'));
        //     /*
        //     | Tags
        //     */
        //     $product->tags()->attach(Tag::inRandomOrder()->take(rand(2, 6))->pluck('id'));
        //     /*
        //     | Reviews
        //     */
        //     Review::factory(rand(0, 5))->approved()->create(['product_id' => $product->id]);
        // }

        /*
        |--------------------------------------------------------------------------
        | Users extra data
        |--------------------------------------------------------------------------
        */
        foreach ($users as $user) {
            Address::factory(rand(1, 3))->create(['user_id' => $user->id]);
            $user->wishlists()->syncWithoutDetaching(Product::inRandomOrder()->take(rand(1, 10))->pluck('id'));
            /*
            | Cart
            */
            $cart = Cart::factory()->active()->create(['user_id' => $user->id]);
            $cart->items()->createMany(Product::inRandomOrder()->take(rand(1, 5))->get()->map(fn($product) => ['product_id' => $product->id, 'quantity' => rand(1, 3)]));
        }
        /*
        |--------------------------------------------------------------------------
        | Payments / Shipping
        |--------------------------------------------------------------------------
        */
        PaymentMethod::factory(5)->create();
        ShippingMethod::factory(5)->create();
        /*
        |--------------------------------------------------------------------------
        | Coupons
        |--------------------------------------------------------------------------
        */
        Coupon::factory(20)->create();
        /*
        |--------------------------------------------------------------------------
        | Orders
        |--------------------------------------------------------------------------
        */
        $products = Product::all();
        foreach ($users as $user) {
            $order = Order::factory()->create(['user_id' => $user->id]);
            /*
            | Items
            */
            OrderItem::factory(rand(1, 5))->create([
                'order_id' => $order->id,
                'product_id' => $products->random()->id,
            ]);
            /*
            | Addresses snapshot
            */
            OrderAddress::factory()->shipping()->create(['order_id' => $order->id]);
            OrderAddress::factory()->billing()->create(['order_id' => $order->id]);
            /*
            | Payment
            */
            Payment::factory()->paid()->create(['order_id' => $order->id]);
            /*
            | Shipment
            */
            Shipment::factory()->delivered()->create(['order_id' => $order->id]);
        }
    }

    public function realData()
    {
        $data = require database_path('data/data.php');

        $authors = collect($data['authors'])
            ->mapWithKeys(function ($authorData, $key) {
                return [
                    $key => Author::updateOrCreate(
                        ['slug' => $authorData['slug']],
                        $authorData
                    ),
                ];
            });

        $publishers = collect($data['publishers'])
            ->mapWithKeys(function ($publisherData, $key) {
                return [
                    $key => Publisher::updateOrCreate(
                        ['slug' => $publisherData['slug']],
                        $publisherData
                    ),
                ];
            });

        $languages = collect($data['languages'])
            ->mapWithKeys(function ($languageData, $key) {
                return [
                    $key => Language::updateOrCreate(
                        ['slug' => $languageData['slug']],
                        $languageData
                    ),
                ];
            });

        $categories = collect($data['categories'])
            ->mapWithKeys(function ($categoryData, $key) {
                return [
                    $key => Category::updateOrCreate(
                        ['slug' => $categoryData['slug']],
                        $categoryData
                    ),
                ];
            });

        $tags = collect($data['tags'])
            ->mapWithKeys(function ($tagData, $key) {
                return [
                    $key => Tag::updateOrCreate(
                        ['slug' => $tagData['slug']],
                        $tagData
                    ),
                ];
            });
        foreach ($data['books'] as $bookData) {
            $product = Product::updateOrCreate(
                ['slug' => $bookData['slug']],
                collect($bookData)
                    ->except([
                        'authors',
                        'publishers',
                        'languages',
                        'categories',
                        'tags',
                        'images'
                    ])
                    ->toArray()
            );

            if (!empty($bookData['images'])) {
                foreach ($bookData['images'] as $image) {
                    $product->images()->updateOrCreate([
                        'image_url' => $image,
                    ]);
                }
            }

            $product->authors()->sync(
                collect($bookData['authors'] ?? [])
                    ->map(fn($key) => $authors[$key]->id)
                    ->all()
            );

            $product->publishers()->sync(
                collect($bookData['publishers'] ?? [])
                    ->map(fn($key) => $publishers[$key]->id)
                    ->all()
            );

            $product->languages()->sync(
                collect($bookData['languages'] ?? [])
                    ->map(fn($key) => $languages[$key]->id)
                    ->all()
            );

            $product->categories()->sync(
                collect($bookData['categories'] ?? [])
                    ->map(fn($key) => $categories[$key]->id)
                    ->all()
            );

            $product->tags()->sync(
                collect($bookData['tags'] ?? [])
                    ->map(fn($key) => $tags[$key]->id)
                    ->all()
            );

            Review::factory(rand(0, 5))
                ->approved()
                ->create([
                    'product_id' => $product->id,
                ]);
        }
    }
}
