export function mapQueryParams<T extends object>(params: T): Partial<T> {
    const entriesParams = Object.entries(params).filter(([, paramValue]) => {
        if (paramValue == null) return false;

        if (typeof paramValue === 'string' && paramValue.trim() === '') return false;

        return true;
    });

    const objectParams = Object.fromEntries(Object.entries(entriesParams));
    return objectParams as Partial<T>;
}
