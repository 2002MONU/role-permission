import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

import { PermissionPagination } from '@/types/role_permission';

import TablePagination from '@/components/table-pagination';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Permissions',
		href: '/permissions',
	},
];

export default function PermissionIndex({
	permissions,
}: {
	permissions: PermissionPagination;
}) {
	const [openAddPermissionDialog, setOpenAddPermissionDialog] =
		useState(false);
	const [openEditPermissionDialog, setOpenEditPermissionDialog] =
		useState(false);

	const { flash } = usePage<{
		flash: {
			message?: string;
			type?: 'success' | 'error' | 'warning';
		};
	}>().props;

	useEffect(() => {
		if (flash?.message) {
			reset();
			setOpenAddPermissionDialog(false);
			setOpenEditPermissionDialog(false);
			toast.success(flash.message);
		}
	}, [flash?.message]);

	const {
		data,
		setData,
		post,
		delete: destroy,
		put,
		processing,
		errors,
		reset,
	} = useForm({
		id: 0,
		name: '',
	});

	function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		post('/permissions', {
			onSuccess: () => {
				reset('name');
				setOpenAddPermissionDialog(false);
			},
		});
	}

	function edit(permission: any) {
		setData({
			id: permission.id,
			name: permission.name,
		});
		setOpenEditPermissionDialog(true);
	}

	function update(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		put(`/permissions/${data.id}`, {
			onSuccess: () => {
				setOpenEditPermissionDialog(false);
				reset('name', 'id');
			},
		});
	}

	function handleDelete(id: number) {
		if (!confirm('Are you sure you want to delete this permission?'))
			return;

		destroy(`/permissions/${id}`, {
			onSuccess: () => {
				toast.success('Permission deleted successfully');
			},
		});
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Permission" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Permission Management</CardTitle>
						<CardAction>
							<Button
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
								{permissions.data.map((permission, index) => (
									<TableRow
										key={permission.id}
										className="odd:bg-slate-100 dark:odd:bg-slate-800"
									>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{permission.name}</TableCell>
										<TableCell>
											{permission.created_at}
										</TableCell>
										<TableCell>
											<Button
												variant="outline"
												className="text-blue-600"
												onClick={() => edit(permission)}
											>
												Edit
											</Button>
											<Button
												onClick={() =>
													handleDelete(permission.id)
												}
												variant="destructive"
												className="ml-3 bg-red-600"
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
								{permissions?.data?.length === 0 && (
									<TableRow>
										<TableCell
											colSpan={4}
											className="text-center"
										>
											No permissions found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</CardContent>
					{permissions.data.length > 0 ? (
						<TablePagination pagination={permissions} />
					) : (
						<div className="h-full p-4 text-center text-gray-500">
							No pagination available
						</div>
					)}
				</Card>
				{/* add here permission dialog box  */}
				<Dialog
					open={openAddPermissionDialog}
					onOpenChange={setOpenAddPermissionDialog}
				>
					<DialogContent className="sm:max-w-[425px]">
						<form onSubmit={submit}>
							<DialogHeader>
								<DialogTitle>Add new Permission</DialogTitle>
							</DialogHeader>
							<hr />
							<div className="grid gap-4">
								<div className="grid gap-3">
									<Label htmlFor="name">
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

									<InputError
										message={errors.name}
										className="mt-2"
									/>
								</div>
							</div>

							<DialogFooter className="mt-4">
								<DialogClose asChild>
									<Button variant="outline" type="button">
										Cancel
									</Button>
								</DialogClose>

								<Button type="submit" disabled={processing}>
									{processing && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Create
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>

				{/* addd permsions dialog box end here  */}

				{/* End here permission dialog box  */}
				<Dialog
					open={openEditPermissionDialog}
					onOpenChange={setOpenEditPermissionDialog}
				>
					<DialogContent className="sm:max-w-[425px]">
						<form onSubmit={update}>
							<DialogHeader>
								<DialogTitle>Edit Permission</DialogTitle>
							</DialogHeader>
							<hr />
							<div className="grid gap-4">
								<div className="grid gap-3">
									<Label htmlFor="name">
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

									<InputError
										message={errors.name}
										className="mt-2"
									/>
								</div>
							</div>

							<DialogFooter className="mt-4">
								<DialogClose asChild>
									<Button variant="outline" type="button">
										Cancel
									</Button>
								</DialogClose>

								<Button type="submit" disabled={processing}>
									{processing && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Update
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</AppLayout>
	);
}
