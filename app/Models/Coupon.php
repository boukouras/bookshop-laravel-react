<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

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
            'usage_limit' => 'integer',
            'used_count' => 'integer',
            'per_user_limit' => 'integer',
            'starts_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active'
            && (!$this->starts_at || now()->greaterThanOrEqualTo($this->starts_at))
            && (!$this->expires_at || now()->lessThanOrEqualTo($this->expires_at));
    }

    public function hasAvailableUses(): bool
    {
        return is_null($this->usage_limit)
            || $this->used_count < $this->usage_limit;
    }

    public function calculateDiscount(float $amount): float
    {
        if (!$this->isActive()) {
            return 0;
        }

        if (
            $this->min_order_amount !== null &&
            $amount < (float) $this->min_order_amount
        ) {
            return 0;
        }

        if ($this->type === 'percentage') {
            $discount = $amount * ((float) $this->value / 100);

            if ($this->max_discount !== null) {
                $discount = min(
                    $discount,
                    (float) $this->max_discount
                );
            }

            return round($discount, 2);
        }

        return round(
            min((float) $this->value, $amount),
            2
        );
    }
}