import { format } from 'date-fns';

export function formatIsoDateTime(date?: string | null, stringFormat: string = 'yyyy-MM-dd') {
    if (!date) return '';

    const formatedDate = new Date(date);

    return format(formatedDate, stringFormat);
}
