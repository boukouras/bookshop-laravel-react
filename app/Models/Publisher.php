<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Publisher extends Model
{
    /** @use HasFactory<\Database\Factories\PublisherFactory> */
    use HasFactory,SoftDeletes;
    protected $fillable = [ 'name', 'slug', 'description', 'logo', 'status', ];
    protected function casts(): array { return [ 'status' => 'boolean', ]; }

    public function products(): BelongsToMany { return $this->BelongsToMany(Product::class, 'publisher_products')->withTimestamps(); }
    public function isActive(): bool { return $this->status === true; }
}
