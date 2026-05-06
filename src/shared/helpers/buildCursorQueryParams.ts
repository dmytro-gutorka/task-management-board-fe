import { GENERAL_QUERY_PARAMS } from '../constants/common.constants.ts';
import type { CursorParam } from '../types/common.ts';

export function buildCursorQueryParams(cursor: CursorParam, limit: number) {
    const params = new URLSearchParams();

    params.set(GENERAL_QUERY_PARAMS.LIMIT, String(limit));

    if (cursor) {
        params.set(GENERAL_QUERY_PARAMS.CURSOR, cursor);
    }

    return params;
}
