<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'coupon_id',
        'shipping_method_id',
        'subtotal_amount',
        'discount_amount',
        'shipping_amount',
        'amount',
        'currency',
        'status',
    ];


    protected function casts(): array
    {
        return [
            'subtotal_amount' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'shipping_amount' => 'decimal:2',
            'amount' => 'decimal:2',
        ];
    }


    /**
     * User who created the order.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Coupon applied to order.
     */
    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }


    /**
     * Shipping method selected.
     */
    public function shippingMethod(): BelongsTo
    {
        return $this->belongsTo(ShippingMethod::class);
    }


    /**
     * Products purchased in this order.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }


    /**
     * Payments made for this order.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }


    /**
     * Addresses stored for this order.
     */
    public function addresses(): HasMany
    {
        return $this->hasMany(OrderAddress::class);
    }


    /**
     * Shipments related to this order.
     */
    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class);
    }


    /**
     * Check if order is completed.
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }


    /**
     * Check if order is paid.
     */
    public function isPaid(): bool
    {
        return in_array($this->status, [
            'paid',
            'processing',
            'shipped',
            'completed',
        ]);
    }


    /**
     * Calculate order total from items.
     */
    public function calculateTotal(): float
    {
        return $this->items->sum('amount')
            - $this->discount_amount
            + $this->shipping_amount;
    }
}