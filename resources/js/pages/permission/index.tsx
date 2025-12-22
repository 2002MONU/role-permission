import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
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
import { Input } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Permissions',
		href: '/permissions',
	},
];

export default function PermissionIndex() {
	const [openAddPermissionDialog, setOpenAddPermissionDialog] =
		useState(false);

        const {flash} = usePage<{flash: {success?: string}}>().props;

        useEffect(() => {
            if (flash.success) {
                toast.success(flash.success);
            }  
        }, [flash.success]);    

	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
	});

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/permissions', {
            onSuccess: () => {
                reset('name');
            },
        });
    }   
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Permission" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="d-flex justify-content-between items-center">
						<CardTitle>Permission Management</CardTitle>
						<CardAction>
							<Button
								variant={'default'}
								onClick={() => setOpenAddPermissionDialog(true)}
							>
								Add Permission
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
										Created AT
									</TableHead>
									<TableHead className="font-bold text-white">
										Action
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow className="odd:bg-slate-100 dark:odd:bg-slate-800">
									<TableCell>1</TableCell>
									<TableCell>view Dash</TableCell>
									<TableCell>1220102</TableCell>
									<TableCell>
										<Button
											variant={'outline'}
											className="text-blue-600"
										>
											Edit
										</Button>
										<Button
											variant={'destructive'}
											className="text-white-600 ml-3 bg-red-600"
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				{/* add here permission dialog box  */}
				<Dialog
					open={openAddPermissionDialog}
					onOpenChange={setOpenAddPermissionDialog}
				>
					<form onSubmit={submit}>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Add new Permission</DialogTitle>
							</DialogHeader>
							<hr />
							<div className="grid gap-4">
								<div className="grid gap-3">
									<Label htmlFor="name-1">
										Permission Name
									</Label>
									<Input
										id="name"
										name="name"
										type="text"
										value={data.name}
										onChange={(e) =>
											setData('name', e.target.value)
										}
										aria-invalid={!!errors.name}
									/>
                                        <InputError message={errors.name} className="mt-2"></InputError>
								</div>
							</div>
							<DialogFooter className="mt-2">
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button type="submit" disabled={processing} >
                                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                   <span>Create</span> </Button>
							</DialogFooter>
						</DialogContent>
					</form>
				</Dialog>
			</div>
		</AppLayout>
	);
}
