import type {
    PermissionRoles,
    PermissionKey,
    PermissionResource,
    PermissionAction,
} from '../permissions/model/permissions.types.ts';

export interface PermissionResponse {
    id: number;
    resource: PermissionResource;
    action: PermissionAction;
    key: PermissionKey;
    description: string | null;
}

export interface RoleWithPermissions {
    id: number;
    name: PermissionRoles;
    description: string | null;
    permissions: PermissionResponse[];
}
