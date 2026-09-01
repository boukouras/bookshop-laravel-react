<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 255)->unique();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->decimal('price')->nullable();
            $table->enum('discount_type', ['percentage', 'fixed'])->nullable();
            $table->decimal('discount_value', 10, 2)->nullable();
            $table->integer('stock')->nullable();
            $table->string('isbn')->nullable();
            $table->integer('pages')->nullable();
            $table->date('release_date')->nullable();
            $table->string('cover_image')->nullable();
            $table->boolean('is_featured')->nullable();
            $table->enum('status', ['active', 'inactive', 'draft'])->default('draft');
            $table->timestamps();
            $table->softDeletes();
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
