export function maoQueryParams<T extends object>(params: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(params).filter(([, paramValue]) => {
            if (paramValue == null) return false;

            if (typeof paramValue === 'string' && paramValue.trim() === '') return false;

            return true;
        }),
    ) as Partial<T>;
}
