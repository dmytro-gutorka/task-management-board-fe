import type { Nullable } from '../../types/common.ts';
import type { PermissionKey } from '../permissions/model/permissions.types.ts';

export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthday: Nullable<string>;
    avatarUrl: Nullable<string>;
    lastLoginAt: Nullable<Date>;
    createdAt: Date;
    updatedAt: Date;
    permissions: PermissionKey[];
}

export interface UpdateMePayload {
    name?: string;
    surname?: string;
    birthday?: Nullable<string>;
}
