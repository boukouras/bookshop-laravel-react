<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'price',
        'discount_type',
        'discount_value',
        'stock',
        'isbn',
        'pages',
        'release_date',
        'cover_image',
        'is_featured',
        'status',
    ];


    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'discount_value' => 'decimal:2',
            'release_date' => 'date',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * Product authors.
     */
    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class, 'author_products')->withTimestamps();
    }


    /**
     * Product publishers.
     */
    public function publishers(): BelongsToMany
    {
        return $this->belongsToMany(Publisher::class, 'publisher_products')->withTimestamps();
    }


    /**
     * Product languages.
     */
    public function languages(): BelongsToMany
    {
        return $this->belongsToMany(Language::class, 'product_languages')->withTimestamps();
    }


    /**
     * Product tags.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'product_tags')->withTimestamps();
    }


    /**
     * Product images.
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }


    /**
     * Product reviews.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }


    /**
     * Wishlist entries.
     */
    public function wishlists(): BelongsToMany
    {
        return $this->belongsToMany(User::class,'wishlists')->withTimestamps();
    }


    /**
     * Cart items.
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }


    /**
     * Order items.
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }


    /**
     * Check if product is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }


    /**
     * Calculate final price after discount.
     */
    public function getFinalPriceAttribute(): float
    {
        if (!$this->discount_type || !$this->discount_value) {
            return (float) $this->price;
        }

        if ($this->discount_type === 'percentage') {
            return round(
                $this->price - ($this->price * $this->discount_value / 100),
                2
            );
        }

        return round(
            $this->price - $this->discount_value,
            2
        );
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            Category::class,
            'product_categories'
        )
            ->withTimestamps()
            ->withPivot('deleted_at');
    }
}