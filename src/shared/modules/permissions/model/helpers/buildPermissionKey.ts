import type { PermissionResource, PermissionAction, PermissionKey } from '../permissions.types.ts';

export function buildPermissionKey(
    resource: PermissionResource,
    action: PermissionAction,
): PermissionKey {
    return `${resource}:${action}`;
}
