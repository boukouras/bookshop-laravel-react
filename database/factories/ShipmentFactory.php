<?php

namespace Database\Factories;

use App\Models\Shipment;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Shipment>
 */
class ShipmentFactory extends Factory
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
            'carrier' => fake()->randomElement(['ACS','DHL','Speedex',]),
            'tracking_number' => fake()->unique()->bothify('TRK########'),
            'status' => fake()->randomElement(['pending','shipped','in_transit','delivered','failed','returned']),
            'shipped_at' => now(),
            'delivered_at' => now(),
        ];
    }

    public function delivered(): static
    {
        return $this->state(['status'=>'delivered','delivered_at'=>now(),]);
    }


    public function pending(): static
    {
        return $this->state(['status'=>'pending','shipped_at'=>null,'delivered_at'=>null,]);
    }
}
