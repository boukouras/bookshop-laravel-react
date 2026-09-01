<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use App\Http\Requests\StorePublisherRequest;
use App\Http\Requests\UpdatePublisherRequest;
use App\Models\Product;
use App\Models\Tag;
use App\Support\AdminListQuery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublisherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('admin/publishers/publishers', [
            'publishers' => Publisher::with([
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
            'admin/publishers/publishers-add'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePublisherRequest $request)
    {
        //
        $validated = $request->validated();

        $publisher = Publisher::create([
            'slug' => $validated['slug'],
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'logo' => $validated['logo'],
        ]);

        return redirect()
            ->route('adminPublishersShow', $publisher->id)
            ->with(
                'success',
                'Publisher created successfully.'
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Publisher $publisher)
    {
        //
        $publisher->load('products');
        return Inertia::render('admin/publishers/publishers-view', [
            'publisher' => $publisher,
            'products' => $publisher->products
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publisher $publisher)
    {
        //
        return Inertia::render('admin/publishers/publishers-view', [
            'publisher' => $publisher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePublisherRequest $request, Publisher $publisher)
    {
        //
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:publishers,slug,' . $publisher->id],
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ]);

        $publisher->update([
            'slug' => $validated['slug'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'logo' => $validated['logo'],
            'status' => $validated['status'],
        ]);

        return back()->with(
            'success',
            'Publisher updated successfully.'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publisher $publisher)
    {
        //
        $publisher->delete();
        return redirect()->route('adminPublishersIndex')->with('success', 'The publisher deleted sucessfully');
    }
}
