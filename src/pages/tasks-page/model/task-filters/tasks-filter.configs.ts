import type { TFunction } from 'i18next';
import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
} from './tasks-filter.constants.ts';

export const getTaskFilterStatusOptions = (t: TFunction) => [
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

export const getTaskFilterPriorityOptions = (t: TFunction) => [
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

export const getTaskFilterSortOptions = (t: TFunction) => [
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
