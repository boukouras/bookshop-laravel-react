<?php

namespace Database\Factories;

use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->randomFloat(2,5,50);

        $quantity = fake()->numberBetween(1,4);
        return [
            //
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'product_name' => fake()->sentence(3),
            'price' => $price,
            'quantity' => $quantity,
            'amount' => $price * $quantity,
        ];
    }
}
