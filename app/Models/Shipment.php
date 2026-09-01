<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_id',
        'carrier',
        'tracking_number',
        'status',
        'shipped_at',
        'delivered_at',
    ];


    protected function casts(): array
    {
        return [
            'shipped_at' => 'datetime',
            'delivered_at' => 'datetime',
        ];
    }


    /**
     * Order related to this shipment.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }


    /**
     * Check if shipment is delivered.
     */
    public function isDelivered(): bool
    {
        return $this->status === 'delivered';
    }


    /**
     * Check if shipment is in transit.
     */
    public function isInTransit(): bool
    {
        return $this->status === 'in_transit';
    }


    /**
     * Mark shipment as shipped.
     */
    public function markAsShipped(): bool
    {
        return $this->update([
            'status' => 'shipped',
            'shipped_at' => now(),
        ]);
    }


    /**
     * Mark shipment as delivered.
     */
    public function markAsDelivered(): bool
    {
        return $this->update([
            'status' => 'delivered',
            'delivered_at' => now(),
        ]);
    }
}