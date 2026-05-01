import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
} from './tasks-filter.constants.ts';

export const getTaskFilterStatusOptions = (t: (key: string, obj: { ns: string }) => string) => [
    {
        value: TASK_STATUS_FILTER.ALL,
        title: t('filters.allStatuses', { ns: 'tasks' }),
    },
    { value: TASK_STATUS_FILTER.TODO, title: t('filters.todo', { ns: 'tasks' }) },
    {
        value: TASK_STATUS_FILTER.IN_PROGRESS,
        title: t('filters.inProgress', { ns: 'tasks' }),
    },
    { value: TASK_STATUS_FILTER.DONE, title: t('filters.done', { ns: 'tasks' }) },
];

export const getTaskFilterPriorityOptions = (t: (key: string, obj: { ns: string }) => string) => [
    {
        value: TASK_PRIORITY_FILTER.ALL,
        title: t('filters.allPriorities', { ns: 'tasks' }),
    },
    {
        value: TASK_PRIORITY_FILTER.HIGH,
        title: t('filters.high', { ns: 'tasks' }),
    },
    {
        value: TASK_PRIORITY_FILTER.MEDIUM,
        title: t('filters.medium', { ns: 'tasks' }),
    },
    { value: TASK_PRIORITY_FILTER.LOW, title: t('filters.low', { ns: 'tasks' }) },
];

export const getTaskFilterSortOptions = (t: (key: string, obj: { ns: string }) => string) => [
    {
        value: TASK_SORT_BY_FILTER.CREATED_AT,
        title: t('filters.createdAt', { ns: 'tasks' }),
    },
    {
        value: TASK_SORT_BY_FILTER.DEADLINE,
        title: t('filters.deadline', { ns: 'tasks' }),
    },
    {
        value: TASK_SORT_BY_FILTER.PRIORITY,
        title: t('filters.priority', { ns: 'tasks' }),
    },
    {
        value: TASK_SORT_BY_FILTER.TITLE,
        title: t('filters.title', { ns: 'tasks' }),
    },
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
