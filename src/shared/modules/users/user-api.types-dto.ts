export interface UserDto {
    id: number;
    email: string;
    name: string | null;
    surname: string | null;
    birthday: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateMeDto {
    name?: string;
    surname?: string;
    birthday?: string | null;
}
