<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\Product;
use App\Support\AdminListQuery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Category::query()
            ->with('parent')
            ->withCount('products');

        return Inertia::render('admin/categories/categories', [
            'categories' => $query->paginate(20)->withQueryString(),
            'stats' => [
                'total' => Category::count(),
                'topLevel' => Category::whereNull('parent_id')->count(),
                'children' => Category::whereNotNull('parent_id')->count(),
                'products' => Product::count(),
            ],
            'parentOptions' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render(
            'admin/categories/categories-add'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        //
        $validated = $request->validated();

        $category = Category::create([
            'slug' => $validated['slug'],
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'image' => $validated['image'],
        ]);

        return redirect()
            ->route('adminCategoriesShow', $category->id)
            ->with(
                'success',
                'Category created successfully.'
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
        $category->load('products');
        return Inertia::render('admin/categories/categories-view', [
            'category' => $category->load(['parent', 'children', 'products']),
            'products' => $category->products
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
        return Inertia::render('admin/categories/categories-edit', [
            'category' => $category,
            'categories' => Category::where('id', '!=', $category->id)->orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:categories,slug,' . $category->id],
            'name' => ['required', 'string', 'max:255'],
            'image' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ]);

        $category->update([
            'slug' => $validated['slug'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'image' => $validated['image'],
            'status' => $validated['status'],
        ]);

        return back()->with(
            'success',
            'Category updated successfully.'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
        $category->delete();
        return redirect()->route('adminCategoriesIndex')->with('success', 'The category deleted sucessfully');
    }
}
