import { TASK_PRIORITY, TASK_STATUS } from '@/pages/tasks-page/model/task.constants';

export const TASK_STATUS_FILTER = {
    ...TASK_STATUS,
    ALL: 'all',
} as const;

export const TASK_PRIORITY_FILTER = {
    ...TASK_PRIORITY,
    ALL: 'all',
} as const;

export const TASK_SORT_BY_FILTER = {
    CREATED_AT: 'createdAt',
    DEADLINE: 'deadline',
    PRIORITY: 'priority',
    TITLE: 'title',
} as const;

export const TASK_VIEW_MODE = {
    GRID: 'grid',
    LIST: 'list',
} as const;
