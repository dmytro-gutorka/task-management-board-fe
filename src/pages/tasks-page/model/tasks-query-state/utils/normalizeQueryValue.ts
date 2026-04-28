import type { TasksQueryParam } from '@/pages/tasks-page/model/tasks-query-state/tasks-query-state.types';
import { tasksQueryParam } from '@/pages/tasks-page/model/tasks-query-state/tasks-query-state.constants';

export function normalizeQueryValue(key: TasksQueryParam, value: string): string {
    if (key === tasksQueryParam.SEARCH) {
        return value.trim();
    }

    return value;
}
