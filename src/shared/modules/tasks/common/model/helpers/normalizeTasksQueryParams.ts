import {
    TASK_STATUS_FILTER,
    TASK_PRIORITY_FILTER,
} from '../../../../../../pages/tasks-page/model/task-filters/tasks-filter.constants.ts';
import type { TasksQueryState } from '../../../../../../pages/tasks-page/model/tasks-query-state/tasks-query-state.types.ts';

export function normalizeTasksQueryParams(params: Partial<TasksQueryState>) {
    const normalizedParams = { ...params };

    if (normalizedParams.status === TASK_STATUS_FILTER.ALL) {
        delete normalizedParams.status;
    }

    if (normalizedParams.priority === TASK_PRIORITY_FILTER.ALL) {
        delete normalizedParams.priority;
    }

    if (normalizedParams.search === '') {
        delete normalizedParams.search;
    }

    return normalizedParams;
}
