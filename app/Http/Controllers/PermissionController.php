<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::latest()->paginate(10);
        $permissions->getCollection()->transform(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
                'created_at' => $permission->created_at->format('Y-m-d H:i:s'),
            ];
        });
        return Inertia::render('permission/index',compact('permissions'));
    }
 
    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|string|unique:permissions,name',
            ],
            [
                'name.required' => 'Permission name is required.',
                'name.unique' => 'This permission already exists.',
            ]
        );

        Permission::create([
            'name' => $request->name,
        ]);

        return redirect()
            ->route('permissions.index')
            ->with([
                'message' => 'Permission created successfully.',
                'type' => 'success', // optional
            ]);
    }


    public function update(Request $request, Permission $permission)
    {
        $request->validate(
            [
                'name' => 'required|string|unique:permissions,name,' . $permission->id,
            ],
            [
                'name.required' => 'Permission name is required.',
                'name.unique' => 'This permission already exists.',
            ]
        );

        $permission->update([
            'name' => $request->name,
        ]);

        return 
            to_route('permissions.index')
            ->with([
                'message' => 'Permission updated successfully.',
                'type' => 'success', // optional
            ]);
    }


    public function destroy(Permission $permission)
    {
        $permission->delete();

        return to_route('permissions.index')
            ->with([
                'message' => 'Permission deleted successfully.',
                'type' => 'success', // optional
            ]);
    }
}
