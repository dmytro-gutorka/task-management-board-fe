import { TASKS_QUERY_PARAMS } from '../tasks-query-state.constants.ts';
import type { TasksQueryParam } from '../tasks-query-state.types.ts';

export function normalizeQueryValue(key: TasksQueryParam, value: string): string {
    if (key === TASKS_QUERY_PARAMS.SEARCH) {
        return value.trim();
    }

    return value;
}
