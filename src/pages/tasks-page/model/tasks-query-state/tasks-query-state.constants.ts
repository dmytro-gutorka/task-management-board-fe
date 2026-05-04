import type { TasksQueryParam } from './tasks-query-state.types.ts';

export const tasksQueryParam = {
    VIEW: 'view',
    STATUS: 'status',
    PRIORITY: 'priority',
    SORT_BY: 'sortBy',
    SEARCH: 'search',
} as const;

export const defaultTasksQueryState = {
    [tasksQueryParam.VIEW]: 'grid',
    [tasksQueryParam.STATUS]: 'all',
    [tasksQueryParam.PRIORITY]: 'all',
    [tasksQueryParam.SORT_BY]: 'title',
    [tasksQueryParam.SEARCH]: '',
} as const satisfies Record<TasksQueryParam, string>;
