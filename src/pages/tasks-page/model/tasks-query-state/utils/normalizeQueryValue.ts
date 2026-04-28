import { tasksQueryParam } from '../tasks-query-state.constants.ts';
import type { TasksQueryParam } from '../tasks-query-state.types.ts';

export function normalizeQueryValue(key: TasksQueryParam, value: string): string {
    if (key === tasksQueryParam.SEARCH) {
        return value.trim();
    }

    return value;
}
