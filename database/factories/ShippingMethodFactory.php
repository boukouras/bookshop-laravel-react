<?php

namespace Database\Factories;

use App\Models\ShippingMethod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ShippingMethod>
 */
class ShippingMethodFactory extends Factory
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
            'name' => fake()->randomElement(['Standard Delivery','Express Delivery','Pickup Point',]),
            'slug' => fake()->unique()->slug(),
            'provider' => fake()->randomElement(['ACS','DHL','Speedex','Courier Center',]),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2,0,10),
            'free_from_amount' => fake()->randomFloat(2,30,100),
            'min_days' => fake()->numberBetween(1,3),
            'max_days' => fake()->numberBetween(4,7),
            'status' => 'active',
            'sort_order' => fake()->numberBetween(0,10),
        ];
    }

    public function inactive(): static
    {
        return $this->state(['status'=>'inactive',]);
    }
}
