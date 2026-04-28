import { type TasksQueryParam } from '@/pages/tasks-page/model/tasks-query-state/tasks-query-state.types';

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
    [tasksQueryParam.SORT_BY]: 'createdAt',
    [tasksQueryParam.SEARCH]: '',
} as const satisfies Record<TasksQueryParam, string>;
