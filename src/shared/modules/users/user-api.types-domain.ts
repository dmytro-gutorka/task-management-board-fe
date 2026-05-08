export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthday: string | null;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateMePayload {
    name?: string;
    surname?: string;
    birthday?: string | null;
}
