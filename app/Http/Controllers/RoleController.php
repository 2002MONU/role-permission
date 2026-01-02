<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Contracts\Role as ContractsRole;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('role/index',[
            'roles' => Role::with('permissions')->paginate(10)->through(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'created_at' => $role->created_at->toDateTimeString(),
                    'permissions' => $role->permissions->pluck('name'),
                ];
            })  ,

        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('role/create',[
            'permissions' => \Spatie\Permission\Models\Permission::all(['id','name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        $role = Role::create([
            'name' => $request->name,
        ]);

        if ($request->has('permissions')) {
            // permissions are sent as array of IDs (strings). Fetch Permission models and sync them to avoid treating IDs as names.
            $permissions = \Spatie\Permission\Models\Permission::whereIn('id', $request->permissions)->get();
            $role->syncPermissions($permissions);
        }

        return to_route('roles.index')->with('message', 'Role created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('role/edit',[
            'role' => Role::with('permissions')->findOrFail($id),
            'permissions' => \Spatie\Permission\Models\Permission::all(['id','name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,'.$id,
            'permissions' => 'array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        $role = Role::findOrFail($id);
        $role->name = $request->name;
        $role->save();

        if ($request->has('permissions')) {
            // permissions are sent as array of IDs (strings). Fetch Permission models and sync them to avoid treating IDs as names.
            $permissions = \Spatie\Permission\Models\Permission::whereIn('id', $request->permissions)->get();
            $role->syncPermissions($permissions);
        } else {
            // If no permissions provided, remove all permissions
            $role->syncPermissions([]);
        }

        return to_route('roles.index')->with('message', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return to_route('roles.index')->with('message', 'Role deleted successfully.');
    }
}
