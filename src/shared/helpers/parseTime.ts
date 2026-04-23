export function parseTime(date?: string | null) {
    if (!date) return Infinity;

    const time = new Date(date).getTime();

    return Number.isNaN(time) ? Infinity : time;
}
