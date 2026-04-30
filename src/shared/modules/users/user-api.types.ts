export interface UpdateMePayload {
    name?: string;
    surname?: string;
    birthday?: string;
}

export interface UpdateMeResponse {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthday: string | null;
    createdAt: string;
    updatedAt: string;
}
