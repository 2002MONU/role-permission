import { usePage } from '@inertiajs/react';

type AuthProps = {
    auth?: {
        permissions?: string[];
    };
};

export function useUserPermissions() {
    const props = usePage<AuthProps>().props;
    const permissions = props?.auth?.permissions ?? [];

    const can = (permission: string): boolean => {
        return permissions.includes(permission);
    };

    return { can };
}


