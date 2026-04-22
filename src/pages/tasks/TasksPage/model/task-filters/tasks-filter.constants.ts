export const TASK_FILTER_STATUS = {
    ALL: 'all',
    TODO: 'toDo',
    IN_PROGRESS: 'in-Progress',
    DONE: 'done',
} as const;

export const TASK_FILTER_PRIORITY = {
    ALL: 'all',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
} as const;

export const TASK_FILTER_SORT_BY = {
    CREATED_AT: 'createdAt',
    DEADLINE: 'deadline',
    PRIORITY: 'priority',
    TITLE: 'title',
} as const;

export const TASK_VIEW_MODE = {
    GRID: 'grid',
    LIST: 'list',
} as const;
