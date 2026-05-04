import { TASKS_QUERY_PARAMS, TASKS_SEARCH_BY_PARAMS } from '../tasks-query-state.constants.ts';
import type { TasksQueryParam, TasksQueryState } from '../tasks-query-state.types.ts';
import { normalizeQueryValue } from './normalizeQueryValue.ts';

export function updateTasksQueryParam(
    nextSearchParams: URLSearchParams,
    nextQueryState: TasksQueryState,
    key: TasksQueryParam,
) {
    const normalizedValue = normalizeQueryValue(key, nextQueryState[key]);

    if (normalizedValue === '') {
        nextSearchParams.delete(key);

        return;
    }

    if (key === TASKS_QUERY_PARAMS.Q) {
        nextSearchParams.delete(TASKS_QUERY_PARAMS.SEARCH_BY);

        const taskSearchParams = Object.values(TASKS_SEARCH_BY_PARAMS);

        taskSearchParams.forEach((param) =>
            nextSearchParams.append(TASKS_QUERY_PARAMS.SEARCH_BY, param),
        );
    }

    nextSearchParams.set(key, normalizedValue);
}
