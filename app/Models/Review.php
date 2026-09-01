<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'comment',
        'verified_purchase',
        'status',
    ];


    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'verified_purchase' => 'boolean',
        ];
    }


    /**
     * User who created the review.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Product being reviewed.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }


    /**
     * Check if review is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }


    /**
     * Check if purchase was verified.
     */
    public function isVerifiedPurchase(): bool
    {
        return $this->verified_purchase;
    }
}