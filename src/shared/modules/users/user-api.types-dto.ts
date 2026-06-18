import type { Nullable } from '../../types/common.ts';
import type { PermissionKey } from '../permissions/model/permissions.types.ts';

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
}

export interface UpdateMeDto {
    name?: string;
    surname?: string;
    birthday?: Nullable<string>;
}
