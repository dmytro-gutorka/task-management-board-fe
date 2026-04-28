import type {
    TasksQueryParam,
    TasksQueryState,
} from '@/pages/tasks-page/model/tasks-query-state/tasks-query-state.types';
import { defaultTasksQueryState } from '@/pages/tasks-page/model/tasks-query-state/tasks-query-state.constants';
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
