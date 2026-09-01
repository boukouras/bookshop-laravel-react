<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
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
            'user_id' => User::factory(),
            'product_id' => Product::factory(),
            'rating' => fake()->numberBetween(1,5),
            'comment' => fake()->paragraph(),
            'verified_purchase' => fake()->boolean(70),
            'status' => fake()->randomElement(['pending','approved','rejected']),
        ];
    }

    public function approved(): static
    {
        return $this->state(['status'=>'approved']);
    }

}
