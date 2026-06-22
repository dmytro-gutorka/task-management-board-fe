import type { ReactNode } from 'react';
import type {
    PermissionCheckInput,
    PermissionMode,
} from '@/shared/modules/permissions/model/permissions.types.ts';
import { NavLink } from 'react-router-dom';

import { Button } from '@/shared/components/shadcn/ui/button';
import { ADMIN_ROUTES } from '@/shared/constants/routes/admin.routes.ts';
import { cn } from '@/shared/helpers/shadcn.utils.ts';
import { PermissionModes } from '@/shared/modules/permissions/model/permissions.constants.ts';
import { PERMISSIONS } from '@/shared/modules/permissions/model/permissions.map.ts';
import { HasPermissions } from '@/shared/modules/permissions/ui/has-permissions.tsx';

interface AdminPageShellProps {
    title: string;
    description: string;
    children: ReactNode;
}

type AdminNavItem = {
    label: string;
    to: string;
    permission: PermissionCheckInput;
    mode: PermissionMode;
};

const adminNavItems: AdminNavItem[] = [
    {
        label: 'Overview',
        to: ADMIN_ROUTES.ADMIN_PAGE,
        permission: [PERMISSIONS.USERS.READ, PERMISSIONS.RBAC.READ],
        mode: PermissionModes.ANY,
    },
    {
        label: 'Users',
        to: ADMIN_ROUTES.ADMIN_USERS_PAGE,
        permission: PERMISSIONS.USERS.READ,
        mode: PermissionModes.ALL,
    },
    {
        label: 'Roles',
        to: ADMIN_ROUTES.ADMIN_ROLES_PAGE,
        permission: PERMISSIONS.RBAC.READ,
        mode: PermissionModes.ALL,
    },
    {
        label: 'Permissions',
        to: ADMIN_ROUTES.ADMIN_PERMISSIONS_PAGE,
        permission: PERMISSIONS.RBAC.READ,
        mode: PermissionModes.ALL,
    },
];

export function AdminPageShell({ title, description, children }: AdminPageShellProps) {
    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
            <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Administration</p>
                <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                <p className="max-w-3xl text-muted-foreground">{description}</p>
            </div>

            <nav className="flex flex-wrap gap-2">
                {adminNavItems.map((item) => (
                    <HasPermissions key={item.to} permission={item.permission} mode={item.mode}>
                        <Button asChild variant="outline" size="sm">
                            <NavLink
                                to={item.to}
                                end={item.to === ADMIN_ROUTES.ADMIN_PAGE}
                                className={({ isActive }) =>
                                    cn(isActive && 'bg-primary/90 text-primary-foreground')
                                }
                            >
                                {item.label}
                            </NavLink>
                        </Button>
                    </HasPermissions>
                ))}
            </nav>

            {children}
        </main>
    );
}
