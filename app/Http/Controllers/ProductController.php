<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Tag;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

use Inertia\Inertia;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('admin/products/products', [
            'products' => Product::with([
                'authors',
                'publishers',
                'languages',
                'tags',
                'images',
                'reviews',
                'categories',
            ])->paginate(100),
            'categories' => Category::all(),
            'tags' => Tag::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render(
            'admin/products/products-add',
            [
                'categories' => Category::all(),
                'tags' => Tag::all(),
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
        $validated = $request->validated();

        $product = Product::create([
            'slug' => $validated['slug'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'isbn' => $validated['isbn'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'release_date' => $validated['release_date'] ?? null,
            'status' => $validated['status'],
            'is_featured' => $validated['is_featured'] ?? false,
        ]);

        $product->categories()->sync(
            $validated['categories'] ?? []
        );

        $product->tags()->sync(
            $validated['tags'] ?? []
        );

        return redirect()
            ->route('adminProductsShow', $product->id)
            ->with(
                'success',
                'Product created successfully.'
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
        return Inertia::render(
            'admin/products/products-view',
            [

                'product' => $product->load([
                    'authors',
                    'publishers',
                    'languages',
                    'tags',
                    'images',
                    'reviews',
                    'reviews.user',
                    'categories',
                ]),
                'categories' => Category::all(),
                'tags' => Tag::all()

            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Product $product)
    {
        //
        return Inertia::render(
            'admin/products/products-edit',
            [

                'product' => $product->load([
                    'authors',
                    'publishers',
                    'languages',
                    'tags',
                    'images',
                    'reviews',
                    'categories',
                ]),
                'categories' => Category::all(),
                'tags' => Tag::all()

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug,' . $product->id],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'isbn' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'status' => ['required', 'in:active,inactive,draft'],
            'is_featured' => ['boolean'],
            'categories' => ['array'],
            'categories.*' => ['exists:categories,id'],
            'tags' => ['array'],
            'tags.*' => ['exists:tags,id'],
        ]);

        $product->update([
            'slug' => $validated['slug'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'isbn' => $validated['isbn'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'status' => $validated['status'],
            'is_featured' => $validated['is_featured'] ?? false,
        ]);

        $product->categories()->sync(
            $validated['categories'] ?? []
        );

        $product->tags()->sync(
            $validated['tags'] ?? []
        );

        return back()->with(
            'success',
            'Product updated successfully.'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
        $product->delete();
        return redirect()->route('adminProductsIndex')->with('success', 'The product deleted sucessfully');
    }
}
