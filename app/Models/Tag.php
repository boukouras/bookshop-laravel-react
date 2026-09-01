<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    /** @use HasFactory<\Database\Factories\TagFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'slug', 'status'];
    protected function casts(): array
    {
        return ['status' => 'string'];
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(
            Product::class,
            'product_tags'
        );
    }
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

}
