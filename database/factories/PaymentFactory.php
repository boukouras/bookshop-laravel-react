<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Order;
use App\Models\PaymentMethod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
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
            'payment_method_id' => PaymentMethod::factory(),
            'transaction_id' => fake()->uuid(),
            'amount' => fake()->randomFloat(2,10,200),
            'currency' => 'EUR',
            'status' => fake()->randomElement(['pending','paid','failed','refunded']),
            'paid_at' => now(),
            'provider_response' => ['success' => true,'message' => 'Payment processed',],
            'failed_reason' => null,
        ];
    }

    public function paid(): static
    {
        return $this->state(['status' => 'paid','paid_at' => now(),]);
    }


    public function failed(): static
    {
        return $this->state(['status' => 'failed','paid_at' => null,'failed_reason' =>'Payment declined',]);
    }
}
