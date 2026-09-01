<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'slug', 'description', 'image', 'parent_id',];
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class,'product_categories')->withTimestamps()->withPivot('deleted_at');}
    public function isRoot(): bool
    {
        return is_null($this->parent_id);
    }
    public function hasChildren(): bool
    {
        return $this->children()->exists();
    }
}
