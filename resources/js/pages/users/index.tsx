import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { PermissionPagination, Role } from '@/types/role_permission';

import TablePagination from '@/components/table-pagination';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { User as UsersPagination } from '@/types/users';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users({
    users,
}: {
    users: UsersPagination;
}) {
   
    const { flash } = usePage<{
        flash: {
            message?: string;
            type?: 'success' | 'error' | 'warning';
        };
    }>().props;

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash?.message]);

 function deleteUser(id: number) {
        if (
            confirm('Are you sure you want to delete this user? This action cannot be undone.')
        ) {
            router.delete(`/users/${id}`);
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>User Management</CardTitle>
                        <CardAction>
                           <Button asChild>
                             <Link href="/users/create">Add New User</Link>
                           </Button>
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <Table>
                            <TableHeader className="bg-slate-50 dark:bg-slate-700">
                                <TableRow>
                                    <TableHead className="font-bold text-white">
                                        ID
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                       Name
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Email
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Role
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Created AT
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user, index) => (
                                    <TableRow
                                        key={user.id}
                                        className="odd:bg-slate-100 dark:odd:bg-slate-800"
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            {user.roles && user.roles.length > 0 ? (
                                                user.roles.map((role: string, rIdx: number) => (
                                                    <span key={rIdx} className="mr-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-800">
                                                        {role}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-sm text-muted-foreground">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{user.created_at}</TableCell>
                                        <TableCell>
                                            <Button asChild variant="outline" className="text-blue-600">
                                              <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                            </Button>
                                            <Button
                                                onClick={() => deleteUser(user.id)}
                                                variant="destructive"
                                                className="ml-3 bg-red-600"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {users?.data?.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center"
                                        >
                                            No users found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                    {users.data.length > 0 ? (
                        <TablePagination pagination={users} />
                    ) : (
                        <div className="h-full p-4 text-center text-gray-500">
                            No pagination available
                        </div>
                    )}
                </Card>
                {/* add here permission dialog box  */}
              
            </div>
        </AppLayout>
    );
}
