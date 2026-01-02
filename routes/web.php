<?php

use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
    Route::post('permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::put('permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::delete('permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');

    // Role Routes
    Route::get('roles', [\App\Http\Controllers\RoleController::class, 'index'])->name('roles.index');
    Route::get('roles/create', [\App\Http\Controllers\RoleController::class, 'create'])->name('roles.create');
    Route::post('roles', [\App\Http\Controllers\RoleController::class, 'store'])->name('roles.store');
    Route::get('roles/{role}/edit', [\App\Http\Controllers\RoleController::class, 'edit'])->name('roles.edit');
    Route::put('roles/{role}', [\App\Http\Controllers\RoleController::class, 'update'])->name('roles.update');
    Route::delete('roles/{role}', [\App\Http\Controllers\RoleController::class, 'destroy'])->name('roles.destroy');
});

require __DIR__.'/settings.php';
