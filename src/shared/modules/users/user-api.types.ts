export interface User {
    id: number;
    email: string;
    name: string | null;
    surname: string | null;
    birthday: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateMePayload {
    name?: string;
    surname?: string;
    birthday?: string | null;
}

export type UpdateMeResponse = User;
export type GetMeResponse = User;
