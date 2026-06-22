import type { Nullable } from '../../../types/common.ts';
import type { PermissionKey, PermissionRoles } from '../../permissions/model/permissions.types.ts';

export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthday: Nullable<string>;

    avatarUrl: Nullable<string>;
    lastLoginAt: Nullable<Date>;

    permissions: PermissionKey[];
    roles: PermissionRoles[];

    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateMePayload {
    name?: string;
    surname?: string;
    birthday?: Nullable<string>;
}

export interface UsersListQuery {
    page?: number;
    limit?: number;
    search?: string;
}

export interface UserListItem {
    id: number;
    email: string;
    name: string | null;
    surname: string | null;
    roles: PermissionRoles[];
    createdAt: Date;
}

export interface UserDetails extends User {
    roles: PermissionRoles[];
    permissions: PermissionKey[];
}

export interface UpdateUserRolesPayload {
    roles: PermissionRoles[];
}
