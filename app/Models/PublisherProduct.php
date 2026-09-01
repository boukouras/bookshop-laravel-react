<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PublisherProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'publisher_id',
        'product_id',
    ];


    /**
     * Publisher assigned to the product.
     */
    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }


    /**
     * Product published by the publisher.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}