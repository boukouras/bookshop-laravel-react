<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'price',
        'quantity',
        'amount',
    ];


    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'amount' => 'decimal:2',
            'quantity' => 'integer',
        ];
    }


    /**
     * Order that owns this item.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }


    /**
     * Product variant purchased.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }


    /**
     * Calculate item amount.
     */
    public function calculateAmount(): float
    {
        return $this->price * $this->quantity;
    }
}