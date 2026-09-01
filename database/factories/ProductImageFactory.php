<?php

namespace Database\Factories;

use App\Models\ProductImage;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductImage>
 */
class ProductImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'product_id' => Product::factory(),
            'image_url' => 'storage/images/products/' .fake()->uuid() .'.jpg',

            'sort_order' => fake()->numberBetween(0,5),
        ];
    }
}
