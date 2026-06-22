import type { Nullable } from '../../../types/common.ts';
import type { PermissionKey, PermissionRoles } from '../../permissions/model/permissions.types.ts';

export interface UserDto {
    id: number;
    email: string;
    name: Nullable<string>;
    surname: Nullable<string>;
    birthday: Nullable<string>;
    avatarUrl: Nullable<string>;
    lastLoginAt: Nullable<string>;
    createdAt: string;
    updatedAt: string;
    permissions: PermissionKey[];
    roles: PermissionRoles[];
}

export interface UpdateMeDto {
    name?: string;
    surname?: string;
    birthday?: Nullable<string>;
}

export interface UserListItemDto {
    id: number;
    email: string;
    name: Nullable<string>;
    surname: Nullable<string>;
    roles: PermissionRoles[];
    createdAt: string;
}

export interface UserDetailsDto extends UserDto {}
