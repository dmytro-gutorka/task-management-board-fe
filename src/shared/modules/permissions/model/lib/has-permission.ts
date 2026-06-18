import type { PermissionCheckInput, PermissionKey, PermissionMode } from '../permissions.types.ts';
import type { Nullable } from '../../../../types/common.ts';
import { PermissionModes } from '../permissions.constants.ts';

export function hasPermission(
    userPermissions: Nullable<PermissionKey[]>,
    required: PermissionCheckInput,
    mode: PermissionMode = PermissionModes.ALL,
): boolean {
    if (!userPermissions?.length) {
        return false;
    }

    const requiredPermissions = Array.isArray(required) ? required : [required];
    const userPermissionsSet = new Set(userPermissions);

    if (mode === PermissionModes.ANY) {
        return requiredPermissions.some((permission) => userPermissionsSet.has(permission));
    }

    return requiredPermissions.every((permission) => userPermissionsSet.has(permission));
}
