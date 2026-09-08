<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'provider',
        'icon',
        'description',
        'cost',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'cost' => 'decimal:2',
        ];
    }
    /**
     * Payments made using this method.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }


    /**
     * Check if payment method is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function cost(): float
    {
        return (float) $this->cost;
    }
}