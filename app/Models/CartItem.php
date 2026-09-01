<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
    ];


    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
        ];
    }


    /**
     * Cart that owns this item.
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }


    /**
     * Product in the cart.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }


    /**
     * Calculate item subtotal.
     */
    public function getSubtotalAttribute(): float
    {
        return $this->quantity * $this->product->final_price;
    }
}