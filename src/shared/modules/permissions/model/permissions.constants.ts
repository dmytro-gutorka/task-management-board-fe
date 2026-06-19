export const PermissionResources = {
    TASKS: 'TASKS',
    USERS: 'USERS',
} as const;

export const PermissionActions = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
} as const;

export const PermissionModes = {
    ANY: 'any',
    ALL: 'all',
} as const;
