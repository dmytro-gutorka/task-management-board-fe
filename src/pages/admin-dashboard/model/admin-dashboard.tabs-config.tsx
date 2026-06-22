import { ADMIN_ROUTES } from '../../../shared/constants/routes/admin.routes.ts';
import { PERMISSIONS } from '../../../shared/modules/permissions/model/permissions.map.ts';
import { UsersIcon, UserCogIcon, ShieldCheckIcon } from 'lucide-react';

export const dashboardCards = [
    {
        title: 'Users',
        description: 'Search users and manage assigned roles.',
        href: ADMIN_ROUTES.ADMIN_USERS_PAGE,
        buttonLabel: 'Open users',
        permission: PERMISSIONS.USERS.READ,
        icon: UsersIcon,
    },
    {
        title: 'Roles',
        description: 'Review role to permission mapping.',
        href: ADMIN_ROUTES.ADMIN_ROLES_PAGE,
        buttonLabel: 'Open roles',
        permission: PERMISSIONS.RBAC.READ,
        icon: UserCogIcon,
    },
    {
        title: 'Permissions',
        description: 'Inspect raw permissions exposed by the API.',
        href: ADMIN_ROUTES.ADMIN_PERMISSIONS_PAGE,
        buttonLabel: 'Open permissions',
        permission: PERMISSIONS.RBAC.READ,
        icon: ShieldCheckIcon,
    },
] as const;
