export const ADMIN_ROUTES = {
    ADMIN_PAGE: '/admin',
    ADMIN_USERS_PAGE: '/admin/users',
    ADMIN_USER_DETAILS_PAGE: '/admin/users/:userId',
    ADMIN_ROLES_PAGE: '/admin/roles',
    ADMIN_PERMISSIONS_PAGE: '/admin/permissions',

    userDetails: (userId: number | string) => `/admin/users/${userId}`,
} as const;
