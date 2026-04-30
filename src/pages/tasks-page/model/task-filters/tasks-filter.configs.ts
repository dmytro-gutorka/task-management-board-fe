import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
} from './tasks-filter.constants.ts';

export const getTaskFilterStatusOptions = (t: (key: string) => string) => [
    { value: TASK_STATUS_FILTER.ALL, title: t('tasks.filters.allStatuses') },
    { value: TASK_STATUS_FILTER.TODO, title: t('tasks.filters.todo') },
    { value: TASK_STATUS_FILTER.IN_PROGRESS, title: t('tasks.filters.inProgress') },
    { value: TASK_STATUS_FILTER.DONE, title: t('tasks.filters.done') },
];

export const getTaskFilterPriorityOptions = (t: (key: string) => string) => [
    { value: TASK_PRIORITY_FILTER.ALL, title: t('tasks.filters.allPriorities') },
    { value: TASK_PRIORITY_FILTER.HIGH, title: t('tasks.filters.high') },
    { value: TASK_PRIORITY_FILTER.MEDIUM, title: t('tasks.filters.medium') },
    { value: TASK_PRIORITY_FILTER.LOW, title: t('tasks.filters.low') },
];

export const getTaskFilterSortOptions = (t: (key: string) => string) => [
    { value: TASK_SORT_BY_FILTER.CREATED_AT, title: t('tasks.filters.createdAt') },
    { value: TASK_SORT_BY_FILTER.DEADLINE, title: t('tasks.filters.deadline') },
    { value: TASK_SORT_BY_FILTER.PRIORITY, title: t('tasks.filters.priority') },
    { value: TASK_SORT_BY_FILTER.TITLE, title: t('tasks.filters.title') },
];

// Fallback for components not yet updated
export const taskFilterStatusOptions = [
    { value: TASK_STATUS_FILTER.ALL, title: 'All statuses' },
    { value: TASK_STATUS_FILTER.TODO, title: 'To Do' },
    { value: TASK_STATUS_FILTER.IN_PROGRESS, title: 'In Progress' },
    { value: TASK_STATUS_FILTER.DONE, title: 'Done' },
] as const;

export const taskFilterPriorityOptions = [
    { value: TASK_PRIORITY_FILTER.ALL, title: 'All priorities' },
    { value: TASK_PRIORITY_FILTER.HIGH, title: 'High' },
    { value: TASK_PRIORITY_FILTER.MEDIUM, title: 'Medium' },
    { value: TASK_PRIORITY_FILTER.LOW, title: 'Low' },
] as const;

export const taskFilterSortOptions = [
    { value: TASK_SORT_BY_FILTER.CREATED_AT, title: 'Date created' },
    { value: TASK_SORT_BY_FILTER.DEADLINE, title: 'Deadline' },
    { value: TASK_SORT_BY_FILTER.PRIORITY, title: 'Priority' },
    { value: TASK_SORT_BY_FILTER.TITLE, title: 'Title' },
] as const;
