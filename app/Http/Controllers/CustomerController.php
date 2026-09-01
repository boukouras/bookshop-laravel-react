<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Tag;
use App\Support\AdminListQuery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    //
    public function index()
    {
        //
        return Inertia::render('admin/customers/customers', [
            'customers' => User::paginate(20),
        ]);
    }

    public function show(User $customer)
    {
        //
        return Inertia::render('admin/customers/customers-view', [
            'customer' => $customer,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $customer)
    {
        //
        return Inertia::render('admin/customers/customers-edit', [
            'customer' => $customer,
        ]);
    }
}
