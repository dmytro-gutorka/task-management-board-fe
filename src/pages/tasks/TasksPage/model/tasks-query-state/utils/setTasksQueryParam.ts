import type {
    TasksQueryParam,
    TasksQueryState,
} from '@/pages/tasks/TasksPage/model/tasks-query-state/tasks-query-state.types';
import { defaultTasksQueryState } from '@/pages/tasks/TasksPage/model/tasks-query-state/tasks-query-state.constants';
import { normalizeQueryValue } from './normalizeQueryValue';

export function setTasksQueryParam(
    nextSearchParams: URLSearchParams,
    nextQueryState: TasksQueryState,
    key: TasksQueryParam,
) {
    const normalizedValue = normalizeQueryValue(key, nextQueryState[key]);
    const normalizedDefaultValue = normalizeQueryValue(key, defaultTasksQueryState[key]);

    if (normalizedValue === normalizedDefaultValue || normalizedValue === '') {
        nextSearchParams.delete(key);
        return;
    }

    nextSearchParams.set(key, normalizedValue);
}
