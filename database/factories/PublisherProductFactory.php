<?php

namespace Database\Factories;

use App\Models\PublisherProduct;
use App\Models\Publisher;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PublisherProduct>
 */
class PublisherProductFactory extends Factory
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
            'publisher_id' => Publisher::factory(),

            'product_id' => Product::factory(),
        ];
    }
}
