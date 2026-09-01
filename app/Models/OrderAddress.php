<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderAddress extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_id',
        'type',
        'country',
        'city',
        'address',
        'number',
        'postal_code',
    ];


    /**
     * Order that owns this address.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }


    /**
     * Check if address is for shipping.
     */
    public function isShipping(): bool
    {
        return $this->type === 'shipping';
    }


    /**
     * Check if address is for billing.
     */
    public function isBilling(): bool
    {
        return $this->type === 'billing';
    }


    /**
     * Get formatted address.
     */
    public function getFullAddressAttribute(): string
    {
        return "{$this->address} {$this->number}, {$this->postal_code} {$this->city}, {$this->country}";
    }
}