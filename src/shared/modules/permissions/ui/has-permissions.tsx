import type { PropsWithChildren, ReactNode } from 'react';
import type { PermissionCheckInput, PermissionMode } from '../model/permissions.types.ts';
import { useCurrentPermissions } from '../model/hooks/useCurrentPermissions.ts';
import { PermissionModes } from '../model/permissions.constants.ts';

type CanProps = PropsWithChildren<{
    permission: PermissionCheckInput;
    mode?: PermissionMode;
    fallback?: ReactNode;
}>;

export function HasPermissions({
    permission,
    mode = PermissionModes.ALL,
    fallback = null,
    children,
}: CanProps) {
    const { insufficientPermissions } = useCurrentPermissions();

    if (insufficientPermissions(permission, mode)) return fallback;

    return children;
}
