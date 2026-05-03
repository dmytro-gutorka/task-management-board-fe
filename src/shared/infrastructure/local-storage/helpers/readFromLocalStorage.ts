export function readFromLocalStorage<T>(key: string): T {
    const raw = localStorage.getItem(key);

    if (!raw) return [] as T;

    try {
        return JSON.parse(raw) as T;
    } catch {
        return [] as T;
    }
}
