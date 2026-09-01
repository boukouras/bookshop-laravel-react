<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coupon extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'description',
        'type',
        'value',
        'min_order_amount',
        'max_discount',
        'usage_limit',
        'used_count',
        'per_user_limit',
        'starts_at',
        'expires_at',
        'status',
    ];


    protected function casts(): array
    {
        return [
            'value' => 'decimal:2',
            'min_order_amount' => 'decimal:2',
            'max_discount' => 'decimal:2',
            'starts_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }


    /**
     * Orders that used this coupon.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }


    /**
     * Check if coupon is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active'
            && (!$this->starts_at || now()->greaterThanOrEqualTo($this->starts_at))
            && (!$this->expires_at || now()->lessThanOrEqualTo($this->expires_at));
    }


    /**
     * Check if coupon has remaining uses.
     */
    public function hasAvailableUses(): bool
    {
        if (is_null($this->usage_limit)) {
            return true;
        }

        return $this->used_count < $this->usage_limit;
    }


    /**
     * Calculate discount amount.
     */
    public function calculateDiscount(float $amount): float
    {
        if (!$this->isActive()) {
            return 0;
        }

        if ($this->min_order_amount &&
            $amount < $this->min_order_amount) {
            return 0;
        }

        if ($this->type === 'percentage') {
            $discount = $amount * ($this->value / 100);

            if ($this->max_discount) {
                $discount = min(
                    $discount,
                    $this->max_discount
                );
            }

            return round($discount, 2);
        }

        return round(
            min($this->value, $amount),
            2
        );
    }
}