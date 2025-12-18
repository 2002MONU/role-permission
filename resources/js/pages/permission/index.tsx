import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permissions',
    },
];

export default function PermissionIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permission" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify--content-between">
                        <CardTitle>Permission Management</CardTitle>
                        <Button>Add Permission</Button>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
