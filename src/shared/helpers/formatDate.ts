import { format } from 'date-fns';
import { isValid } from 'date-fns/isValid';

export function formatDate(value: string | Date | null | undefined) {
    if (!value) return '—';

    const date = new Date(value);

    if (!isValid(date)) return '—';

    return format(date, 'MMM dd, yyyy');
}
