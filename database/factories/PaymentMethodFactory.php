<?php

namespace Database\Factories;

use App\Models\PaymentMethod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PaymentMethod>
 */
class PaymentMethodFactory extends Factory
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
            'name' => fake()->randomElement(['Credit Card','PayPal','Bank Transfer','Cash on Delivery',]),
            'slug' => fake()->unique()->slug(),
            'provider' => fake()->randomElement(['stripe','paypal','bank','cod',]),
            'icon' => null,
            'description' => fake()->sentence(),
            'status' => 'active',
        ];
    }

    public function inactive(): static
    {
        return $this->state(['status' => 'inactive',]);
    }
}
