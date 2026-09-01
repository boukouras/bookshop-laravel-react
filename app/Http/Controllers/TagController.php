<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;
use Inertia\Inertia;
class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('admin/tags/tags', [
            'tags' => Tag::paginate(20),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render(
            'admin/tags/tags-add',
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        //
        $validated = $request->validated();

        $tag = Tag::create([
            'slug' => $validated['slug'],
            'name' => $validated['name'],
        ]);

        return redirect()
            ->route('adminTagsShow', $tag->id)
            ->with(
                'success',
                'Tag created successfully.'
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
        $tag->load('products');
        return Inertia::render('admin/tags/tags-view', [
            'tag' => $tag,
            'products' => $tag->products
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        //
        return Inertia::render('admin/tags/tags-edit', [
            'tag' => $tag,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        //
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:tags,slug,' . $tag->id],
            'name' => ['required', 'string', 'max:255'],
        ]);

        $tag->update([
            'slug' => $validated['slug'],
            'name' => $validated['name'],
        ]);

        return back()->with(
            'success',
            'Tag updated successfully.'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        //
        $tag->delete();
        return redirect()->route('adminTagsIndex')->with('success', 'The tag deleted sucessfully');
    }
}
