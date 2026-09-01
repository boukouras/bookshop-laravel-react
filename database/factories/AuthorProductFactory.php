<?php

namespace Database\Factories;

use App\Models\AuthorProduct;
use App\Models\Author;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AuthorProduct>
 */
class AuthorProductFactory extends Factory
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
            'author_id' => Author::factory(),

            'product_id' => Product::factory(),
        ];
    }
}
