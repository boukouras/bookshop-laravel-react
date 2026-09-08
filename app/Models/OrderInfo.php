<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderInfo extends Model
{
    /** @use HasFactory<\Database\Factories\OrderInfoFactory> */
    use HasFactory;

    protected $fillable = [
        'order_id',
        'email',
        'fname',
        'lname',
        'phone',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
