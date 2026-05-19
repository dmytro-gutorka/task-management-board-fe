import type { Nullable } from '../../types/common.ts';

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
}

export interface UpdateMePayload {
    name?: string;
    surname?: string;
    birthday?: Nullable<string>;
}
