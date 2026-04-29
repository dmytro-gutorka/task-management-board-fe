import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
} from './tasks-filter.constants.ts';

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
