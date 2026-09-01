<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductLanguage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'language_id',
    ];


    /**
     * Product that uses this language.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }


    /**
     * Language assigned to the product.
     */
    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}