import { GENERAL_QUERY_PARAMS } from '../../constants/common.constants.ts';
import type { CursorParams } from '../../types/common.ts';

export function mapCursorQueryParams(params: URLSearchParams): CursorParams {
    return {
        cursor: params.get(GENERAL_QUERY_PARAMS.CURSOR) ?? undefined,
        limit: params.has(GENERAL_QUERY_PARAMS.LIMIT)
            ? Number(params.get(GENERAL_QUERY_PARAMS.LIMIT))
            : undefined,
    };
}
