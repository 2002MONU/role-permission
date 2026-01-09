import { Button } from '@/components/ui/button';

import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type SinglePermission, type SingleRole } from '@/types/role_permission';
import InputError from '@/components/input-error';
import { Head, Link, router, useForm } from '@inertiajs/react';

// Breadcrumbs are set inside the component so we can include the role id when editing.

export default function EditRole({ permissions = [], role }: { permissions?: SinglePermission[]; role: SingleRole }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit Role',
            href: `/roles/${role.id}/edit`,
        },
    ];

    const permissionList = role.permissions.map((perm: SinglePermission) => String(perm.id));
    const { data, setData, put, processing, errors, reset } = useForm<{ name: string; permissions: string[] }>({
        name: role.name,
        permissions: permissionList,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/roles/${role.id}`);
    }

    function deleteRole() {
        if (confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
            router.delete(`/roles/${role.id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Edit Role</CardTitle>
                        <CardAction>
                            <Button asChild>
                              <Link href="/roles">Go Back</Link>
                            </Button>
                            <Button onClick={() => deleteRole()} variant="destructive" className="ml-3 bg-red-600">
                                Delete
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="roleName">Role</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id="roleName"
                                    name="name"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter role name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid w-full max-w-sm items-start gap-2 mt-4">
                                <label htmlFor="permissions">Permissions</label>
                                <div className="w-full rounded-md border border-input bg-background p-2 max-h-48 overflow-auto">
                                    {permissions.length === 0 && (
                                        <div className="text-sm text-muted-foreground">No permissions available.</div>
                                    )}
                                    {permissions.map((permission: SinglePermission) => {
                                        const id = String(permission.id);
                                        const checked = data.permissions.includes(id);
                                        return (
                                            <label key={permission.id} className="flex items-center gap-2 p-1 rounded hover:bg-accent/50">
                                                <input
                                                    type="checkbox"
                                                    value={id}
                                                    checked={checked}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (e.target.checked) {
                                                            setData('permissions', [...data.permissions, val]);
                                                        } else {
                                                            setData('permissions', data.permissions.filter((p) => p !== val));
                                                        }
                                                    }}
                                                    className="accent-primary"
                                                />
                                                <span className="select-none">{permission.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                <InputError message={errors.permissions} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <Button type="submit" disabled={processing}>
                                    Update
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
