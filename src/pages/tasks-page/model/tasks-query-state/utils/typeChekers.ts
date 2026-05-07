import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
} from '../../task-filters/tasks-filter.constants.ts';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
} from '../../task-filters/tasks-filter.types.ts';

export function isTaskStatusFilter(value: string): value is TaskStatusFilter {
    return Object.values(TASK_STATUS_FILTER).includes(value as TaskStatusFilter);
}

export function isTaskPriorityFilter(value: string): value is TaskPriorityFilter {
    return Object.values(TASK_PRIORITY_FILTER).includes(value as TaskPriorityFilter);
}

export function isTaskSortBy(value: string): value is TaskSortBy {
    return Object.values(TASK_SORT_BY_FILTER).includes(value as TaskSortBy);
}
