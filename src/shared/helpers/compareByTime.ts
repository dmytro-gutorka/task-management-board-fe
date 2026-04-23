import { parseTime } from '@/shared/helpers/parseTime';

export function compareByTime(a?: string | null, b?: string | null) {
    return parseTime(a) - parseTime(b);
}
