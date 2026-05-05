export type ValueOf<T> = T[keyof T];
export type Nullable<T> = T | null;

export type MetaDbFields = 'id' | 'createdAt' | 'updatedAt';

export interface FromPathLocationState {
    from?: {
        pathname?: string;
    };
}

export type CursorParam = Nullable<string>;

export interface CursorParams {
    cursor?: CursorParam;
    limit?: number;
}

export interface PagePaginationResponse<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface CursorPaginationResponse<T> {
    items: T[];
    nextCursor: CursorParam;
}
