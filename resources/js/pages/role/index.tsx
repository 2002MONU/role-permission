
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
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Roles({
    roles,
}: {
    roles: Role;
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

 function deleteRole(id: number) {
        if (
            confirm('Are you sure you want to delete this role? This action cannot be undone.')
        ) {
            router.delete(`/roles/${id}`);
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Roles Management</CardTitle>
                        <CardAction>
                           <Button asChild>
                             <Link href="/roles/create">Add New Role</Link>
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
                                        Role Name
                                    </TableHead>
                                    <TableHead className="font-bold text-white">
                                        Permission
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
                                {roles.data.map((role, index) => (
                                    <TableRow
                                        key={role.id}
                                        className="odd:bg-slate-100 dark:odd:bg-slate-800"
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell>
                                            {role.permissions && role.permissions.length > 0 ? (
                                                role.permissions.join(', ')
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{role.created_at}</TableCell>
                                        <TableCell>
                                            <Button asChild variant="outline" className="text-blue-600">
                                              <Link href={`/roles/${role.id}/edit`}>Edit</Link>
                                            </Button>
                                            <Button
                                                onClick={() => deleteRole(role.id)}
                                                variant="destructive"
                                                className="ml-3 bg-red-600"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {roles?.data?.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center"
                                        >
                                            No roles found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                    {roles.data.length > 0 ? (
                        <TablePagination pagination={roles} />
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
