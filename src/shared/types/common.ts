export type ValueOf<T> = T[keyof T];
export type Nullable<T> = T | null;

export type MetaDbFields = 'id' | 'createdAt' | 'updatedAt';

export interface FromPathLocationState {
    from?: {
        pathname?: string;
    };
}
