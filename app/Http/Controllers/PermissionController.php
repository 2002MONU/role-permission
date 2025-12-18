<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('permission/index');
    }
}
