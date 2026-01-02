export interface PaginationLink {
	url: string | null;
	label: string;
	active: boolean;
}

export interface Pagination {
	links: PaginationLink[];
	from: number;
	to: number;
	total: number;
	current_page: number;
	last_page: number;
	per_page: number;
}

export interface SingleRole {
	id: number;
	name: string;
	created_at: string;
	permissions: SinglePermission[];
}

export interface PermissionPagination extends Pagination {
	data: SinglePermission[];
}

export interface SinglePermission {
	id: number;
	name: string;
	created_at: string;
}

export interface Role extends Pagination {
	data: SingleRole[];
}
