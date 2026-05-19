import type { Nullable } from '../../types/common.ts';

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
}

export interface UpdateMeDto {
    name?: string;
    surname?: string;
    birthday?: Nullable<string>;
}
