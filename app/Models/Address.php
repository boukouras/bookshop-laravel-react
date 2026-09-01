<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'country',
        'city',
        'address',
        'number',
        'postal_code',
        'type',
        'is_default',
    ];


    protected function casts(): array
    {
        return [
            'is_default' => 'boolean',
        ];
    }


    /**
     * User who owns this address.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Check if address is default.
     */
    public function isDefault(): bool
    {
        return $this->is_default;
    }


    /**
     * Get full formatted address.
     */
    public function getFullAddressAttribute(): string
    {
        return "{$this->address} {$this->number}, {$this->postal_code} {$this->city}, {$this->country}";
    }
}