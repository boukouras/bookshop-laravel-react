<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Product;
use App\Support\AdminListQuery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('admin/authors/authors', [
            'authors' => Author::with([
                'products',
            ])->paginate(20),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render(
            'admin/authors/authors-add',
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuthorRequest $request)
    {
        //
        $validated = $request->validated();

        $author = Author::create([
            'slug' => $validated['slug'],
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'logo' => $validated['logo'],
        ]);

        return redirect()
            ->route('adminAuthorsShow', $author->id)
            ->with(
                'success',
                'Author created successfully.'
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        //
        $author->load('products');
        return Inertia::render('admin/authors/authors-view', [
            'author' => $author,
            'products' => $author->products
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Author $author)
    {
        //
        return Inertia::render('admin/authors/authors-edit', [
            'author' => $author,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        //
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:authors,slug,' . $author->id],
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ]);

        $author->update([
            'slug' => $validated['slug'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'logo' => $validated['logo'],
            'status' => $validated['status'],
        ]);

        return back()->with(
            'success',
            'Author updated successfully.'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        //
        $author->delete();
        return redirect()->route('adminAuthorsIndex')->with('success', 'The author deleted sucessfully');
    }
}
