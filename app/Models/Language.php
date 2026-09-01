<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Language extends Model
{
    /** @use HasFactory<\Database\Factories\LanguageFactory> */
    use HasFactory, SoftDeletes;

    

    protected $fillable = [ 'name', 'symbol', 'iso', 'slug', ];
    public function products(): BelongsToMany { return $this->belongsToMany(Product::class) ->withTimestamps() ->withPivot('deleted_at'); }
}
