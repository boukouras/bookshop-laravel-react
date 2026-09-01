<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\Publisher;
/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
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
            'title' => fake()->sentence(3),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2,5,50),
            'discount_type' => null,
            'discount_value' => null,
            'stock' => fake()->numberBetween(0,100),
            'isbn' => fake()->isbn13(),
            'pages' => fake()->numberBetween(50,800),
            'release_date' => fake()->date(),
            'cover_image' => 'storage/images/products/default.jpg',
            'is_featured' => fake()->boolean(20),
            'status' => 'active',
        ];
    }
}
