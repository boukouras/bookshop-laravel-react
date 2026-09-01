<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuthorProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'author_id',
        'product_id',
    ];


    /**
     * Author assigned to the product.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }


    /**
     * Product written by the author.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}