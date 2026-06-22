import { PermissionModes } from '../../../shared/modules/permissions/model/permissions.constants.ts';
import { PermissionRoute } from '../custom-routes/permission-route.tsx';
import { PERMISSIONS } from '../../../shared/modules/permissions/model/permissions.map.ts';
import { ADMIN_ROUTES } from '../../../shared/constants/routes/admin.routes.ts';
import AdminDashboardPage from '../../../pages/admin-dashboard/ui/admin-dashboard-page.tsx';
import AdminUserDetailsPage from '../../../pages/admin-user-details/ui/admin-user-details-page.tsx';
import AdminRolesPage from '../../../pages/admin-roles/ui/admin-roles-page.tsx';
import AdminPermissionsPage from '../../../pages/admin-permissions/ui/admin-permissions-page.tsx';
import AdminUsersPage from '../../../pages/admin-users/ui/admin-users-page.tsx';

export const adminRoutes = [
    {
        element: (
            <PermissionRoute
                mode={PermissionModes.ANY}
                permission={[PERMISSIONS.USERS.READ, PERMISSIONS.RBAC.READ]}
            />
        ),
        children: [
            {
                path: ADMIN_ROUTES.ADMIN_PAGE,
                element: <AdminDashboardPage />,
            },
        ],
    },
    {
        element: <PermissionRoute permission={PERMISSIONS.USERS.READ} />,
        children: [
            {
                path: ADMIN_ROUTES.ADMIN_USERS_PAGE,
                element: <AdminUsersPage />,
            },
            {
                path: ADMIN_ROUTES.ADMIN_USER_DETAILS_PAGE,
                element: <AdminUserDetailsPage />,
            },
        ],
    },
    {
        element: <PermissionRoute permission={PERMISSIONS.RBAC.READ} />,
        children: [
            {
                path: ADMIN_ROUTES.ADMIN_ROLES_PAGE,
                element: <AdminRolesPage />,
            },
            {
                path: ADMIN_ROUTES.ADMIN_PERMISSIONS_PAGE,
                element: <AdminPermissionsPage />,
            },
        ],
    },
];
