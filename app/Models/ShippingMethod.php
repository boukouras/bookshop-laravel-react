<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShippingMethod extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'provider',
        'description',
        'price',
        'free_from_amount',
        'min_days',
        'max_days',
        'status',
        'sort_order',
    ];


    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'free_from_amount' => 'decimal:2',
            'min_days' => 'integer',
            'max_days' => 'integer',
            'sort_order' => 'integer',
        ];
    }


    /**
     * Orders using this shipping method.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }


    /**
     * Check if shipping method is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }


    /**
     * Check if shipping is free for an amount.
     */
    public function isFreeFor(float $amount): bool
    {
        return $this->free_from_amount !== null
            && $amount >= $this->free_from_amount;
    }


    /**
     * Calculate shipping cost.
     */
    public function calculatePrice(float $amount): float
    {
        if ($this->isFreeFor($amount)) {
            return 0;
        }

        return (float) $this->price;
    }


    /**
     * Delivery estimate text.
     */
    public function getDeliveryEstimateAttribute(): ?string
    {
        if (!$this->min_days && !$this->max_days) {
            return null;
        }

        if ($this->min_days === $this->max_days) {
            return "{$this->min_days} days";
        }

        return "{$this->min_days}-{$this->max_days} days";
    }
}