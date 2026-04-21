export function getAvatarFallback(name?: string) {
    if (!name) return 'UN';

    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const second = parts[1]?.[0] ?? '';

    return `${first}${second}`.toUpperCase() || 'UN';
}
