<?php

namespace Database\Factories;

use App\Models\ProductLanguage;
use App\Models\Product;
use App\Models\Language;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductLanguage>
 */
class ProductLanguageFactory extends Factory
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

            'language_id' => Language::factory(),
        ];
    }
}
