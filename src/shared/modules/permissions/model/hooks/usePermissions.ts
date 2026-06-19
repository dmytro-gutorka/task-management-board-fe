import type { PermissionKey, PermissionCheckInput, PermissionMode } from '../permissions.types.ts';
import { useMemo } from 'react';
import type { Nullable } from '../../../../types/common.ts';
import { PermissionModes } from '../permissions.constants.ts';

export function usePermissions(permissions?: Nullable<PermissionKey[]>) {
    const permissionsSet = useMemo(() => new Set(permissions ?? []), [permissions]);

    const sufficientPermissions = (
        required: PermissionCheckInput,
        mode: PermissionMode = PermissionModes.ALL,
    ): boolean => {
        const requiredPermissions = Array.isArray(required) ? required : [required];

        if (mode === PermissionModes.ANY) {
            return requiredPermissions.some((permission) => permissionsSet.has(permission));
        }

        return requiredPermissions.every((permission) => permissionsSet.has(permission));
    };

    const insufficientPermissions = (
        required: PermissionCheckInput,
        mode: PermissionMode = PermissionModes.ALL,
    ): boolean => {
        return !sufficientPermissions(required, mode);
    };

    return {
        sufficientPermissions,
        insufficientPermissions,
    };
}
