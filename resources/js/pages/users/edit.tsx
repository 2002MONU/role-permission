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
import InputError from '@/components/input-error';
import { Head, Link, useForm } from '@inertiajs/react';

type Role = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    roles: Role[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit User',
        href: '/users',
    },
];

export default function EditUser({
    roles,
    user,
}: {
    roles: Role[];
    user: User;
}) {
    // ✅ store role IDs, not names
    const roleIds = user.roles.map((role) => String(role.id));

    const { data, setData, put, processing, errors } = useForm<{
        name: string;
        email: string;
        roles: string[];
    }>({
        name: user.name,
        email: user.email,
        roles: roleIds,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/users/${user.id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Edit User</CardTitle>
                        <CardAction>
                            <Button asChild variant="secondary">
                                <Link href="/users">Go Back</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Name */}
                            <div className="grid w-full max-w-sm gap-1.5">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email */}
                            <div className="grid w-full max-w-sm gap-1.5">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Roles */}
                            <div className="grid w-full max-w-sm gap-2">
                                <label>Roles</label>

                                <div className="rounded-md border p-2 max-h-48 overflow-auto">
                                    {roles.length === 0 && (
                                        <p className="text-sm text-muted-foreground">
                                            No roles available.
                                        </p>
                                    )}

                                    {roles.map((role) => {
                                        const id = String(role.id);
                                        return (
                                            <label
                                                key={role.id}
                                                className="flex items-center gap-2 p-1 hover:bg-accent/50 rounded"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={id}
                                                    checked={data.roles.includes(
                                                        id
                                                    )}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setData('roles', [
                                                                ...data.roles,
                                                                id,
                                                            ]);
                                                        } else {
                                                            setData(
                                                                'roles',
                                                                data.roles.filter(
                                                                    (r) =>
                                                                        r !==
                                                                        id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                                <span>{role.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>

                                <InputError message={errors.roles} />
                            </div>

                            <Button type="submit" disabled={processing}>
                                Update User
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
