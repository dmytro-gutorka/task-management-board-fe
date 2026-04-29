import { defaultTasksQueryState } from '../tasks-query-state.constants.ts';
import type { TasksQueryParam, TasksQueryState } from '../tasks-query-state.types.ts';
import { normalizeQueryValue } from './normalizeQueryValue';

export function updateTasksQueryParam(
    nextSearchParams: URLSearchParams,
    nextQueryState: TasksQueryState,
    key: TasksQueryParam,
) {
    const normalizedValue = normalizeQueryValue(key, nextQueryState[key]);

    if (normalizedValue === defaultTasksQueryState[key] || normalizedValue === '') {
        nextSearchParams.delete(key);
        return;
    }

    nextSearchParams.set(key, normalizedValue);
}
