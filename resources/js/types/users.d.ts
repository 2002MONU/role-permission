import { Pagination } from "./pagination";

export interface SingleUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}
 
export interface User extends Pagination {
    data: SingleUser[];
}