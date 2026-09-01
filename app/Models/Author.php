<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Author extends Model
{
    /** @use HasFactory<\Database\Factories\AuthorFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [ 'name', 'slug', 'description', 'logo', 'status', ];
    protected function casts(): array { return [ 'status' => 'boolean', ]; }

    public function products(): BelongsToMany { return $this->BelongsToMany(Product::class, 'author_products')->withTimestamps(); }
    public function isActive(): bool { return $this->status === true; }
}
