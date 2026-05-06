import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
} from '../task-filters/tasks-filter.constants.ts';
import type { TasksQueryParam } from './tasks-query-state.types.ts';

export const TASKS_QUERY_PARAMS = {
    STATUS: 'status',
    PRIORITY: 'priority',
    SORT_BY: 'sortBy',
    SEARCH_BY: 'searchBy',
    PAGE: 'page',
    SEARCH: 'search',
} as const;

export const TASKS_SEARCH_BY_PARAMS = {
    TITLE: 'title',
    DESCRIPTION: 'description',
};

export const defaultTasksQueryState = {
    [TASKS_QUERY_PARAMS.PAGE]: '1',
    [TASKS_QUERY_PARAMS.SEARCH]: '',
    [TASKS_QUERY_PARAMS.STATUS]: TASK_STATUS_FILTER.ALL,
    [TASKS_QUERY_PARAMS.SORT_BY]: TASK_SORT_BY_FILTER.TITLE,
    [TASKS_QUERY_PARAMS.PRIORITY]: TASK_PRIORITY_FILTER.ALL,
    [TASKS_QUERY_PARAMS.SEARCH_BY]: TASKS_SEARCH_BY_PARAMS.TITLE,
} as const satisfies Record<TasksQueryParam, string>;
