export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthday: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateMePayload {
    name?: string;
    surname?: string;
    birthday?: Date | null;
}
