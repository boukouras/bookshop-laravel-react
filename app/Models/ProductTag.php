<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductTag extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'tag_id',
    ];


    /**
     * Product related to this tag assignment.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }


    /**
     * Tag assigned to the product.
     */
    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }
}