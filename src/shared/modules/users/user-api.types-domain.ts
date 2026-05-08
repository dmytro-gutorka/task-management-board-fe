export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthday: string | null;
    lastLoginAt: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateMePayload {
    name?: string;
    surname?: string;
    birthday?: string | null;
}
