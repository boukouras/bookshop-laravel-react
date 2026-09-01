<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Coupon>
 */
class CouponFactory extends Factory
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
            'code' => strtoupper(fake()->unique()->bothify('BOOK-####')),
            'description' => fake()->sentence(),
            'type' => fake()->randomElement(['percentage','fixed']),
            'value' => fake()->randomFloat(2,5,30),
            'min_order_amount' => fake()->randomFloat(2,20,100),
            'max_discount' => fake()->randomFloat(2,10,50),
            'usage_limit' => fake()->numberBetween(10,500),
            'used_count' => 0,
            'per_user_limit' => fake()->numberBetween(1,3),
            'starts_at' => now(),
            'expires_at' => now()->addMonths(3),
            'status' => 'active',
        ];
    }

    public function expired(): static
    {
        return $this->state(['status'=>'expired','expires_at'=>now()->subDay()]);
    }
}
