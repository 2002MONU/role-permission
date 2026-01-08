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


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create User',
        href: '/users/create',
    },
];

export default function CreateUser({ roles = [] }: { roles: { id: number; name: string }[] }) {
    const { data, setData, post, processing, errors, reset } = useForm<{ name: string; email: string; password: string; roles: string[] }>({
        name: '',
        email: '',
        password: '',
        roles: [] as string[],
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/users');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Create User</CardTitle>
                        <CardAction>
                            <Link href="/users">
                                <Button>Go Back</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="roleName">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id="roleName"
                                    name="name"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter Name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                             <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    id="email"
                                    name="email"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter email"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    id="password"
                                    name="password"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter password"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="grid w-full max-w-sm items-start gap-2 mt-4">
                                <label htmlFor="roles">Roles</label>
                                <div className="w-full rounded-md border border-input bg-background p-2 max-h-48 overflow-auto">
                                    {roles.length === 0 && (
                                        <div className="text-sm text-muted-foreground">No roles available.</div>
                                    )}
                                    {roles.map((role: { id: number; name: string }) => {
                                        const id = String(role.id);
                                        const checked = data.roles.includes(id);
                                        return (
                                            <label key={role.id} className="flex items-center gap-2 p-1 rounded hover:bg-accent/50">
                                                <input
                                                    type="checkbox"
                                                    value={id}
                                                    checked={checked}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (e.target.checked) {
                                                            setData('roles', [...data.roles, val]);
                                                        } else {
                                                            setData('roles', data.roles.filter((p) => p !== val));
                                                        }
                                                    }}
                                                    className="accent-primary"
                                                />
                                                <span className="select-none">{role.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                <InputError message={errors.roles} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <Button type="submit" disabled={processing}>
                                    Create
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
