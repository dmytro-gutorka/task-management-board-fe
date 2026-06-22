import { buildPermissionKey } from './helpers/buildPermissionKey.ts';
import type { PermissionResource, PermissionAction, PermissionKey } from './permissions.types.ts';
import { PermissionResources, PermissionActions } from './permissions.constants.ts';

function createCrudPermissions(
    resource: PermissionResource,
): Record<PermissionAction, PermissionKey> {
    return {
        CREATE: buildPermissionKey(resource, PermissionActions.CREATE),
        READ: buildPermissionKey(resource, PermissionActions.READ),
        UPDATE: buildPermissionKey(resource, PermissionActions.UPDATE),
        DELETE: buildPermissionKey(resource, PermissionActions.DELETE),
    };
}

export const PERMISSIONS = {
    [PermissionResources.TASKS]: createCrudPermissions('TASKS'),
    [PermissionResources.USERS]: createCrudPermissions('USERS'),
    [PermissionResources.RBAC]: createCrudPermissions('RBAC'),
} as const satisfies Record<PermissionResource, Record<PermissionAction, PermissionKey>>;
