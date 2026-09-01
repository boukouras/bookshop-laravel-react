<?php

namespace Database\Factories;

use App\Models\OrderAddress;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrderAddress>
 */
class OrderAddressFactory extends Factory
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
            'order_id' => Order::factory(),
            'type' => fake()->randomElement(['billing','shipping']),
            'country' => fake()->country(),
            'city' => fake()->city(),
            'address' => fake()->streetName(),
            'number' => fake()->buildingNumber(),
            'postal_code' => fake()->postcode(),
        ];
    }

    public function shipping(): static
    {
        return $this->state(['type' => 'shipping',]);
    }


    public function billing(): static
    {
        return $this->state(['type' => 'billing',]);
    }
}
