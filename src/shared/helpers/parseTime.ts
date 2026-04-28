import { parseISO, isValid } from 'date-fns';

export function parseTime(date?: string | null) {
    if (!date) return Infinity;

    const parsed = parseISO(date);

    return isValid(parsed) ? parsed.getTime() : Infinity;
}
