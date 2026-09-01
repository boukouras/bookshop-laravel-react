<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends Factory<Address>
 */
class AddressFactory extends Factory
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
            'name' => fake()->name(),
            'country' => fake()->country(),
            'city' => fake()->city(),
            'address' => fake()->streetName(),
            'number' => fake()->buildingNumber(),
            'postal_code' => fake()->postcode(),
            'type' => fake()->randomElement(['Home','Office','Other']),
            'is_default' => false,
        ];
    }

    public function default(): static
    {
        return $this->state([
            'is_default' => true,
        ]);
    }
}
