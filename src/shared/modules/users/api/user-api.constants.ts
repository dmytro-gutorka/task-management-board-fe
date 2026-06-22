export const USER_API_ROUTES = {
    ROOT: '/users',

    ME: '/users/me',
    ME_AVATAR: '/users/me/avatar',

    byId: (id: number | string) => `/users/${id}`,
    roles: (id: number | string) => `/users/${id}/roles`,
};
