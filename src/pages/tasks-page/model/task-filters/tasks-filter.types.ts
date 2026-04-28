import { type ValueOf } from '@/shared/types/common';
import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
    type TASK_VIEW_MODE,
} from './tasks-filter.constants.ts';

export type TaskViewMode = ValueOf<typeof TASK_VIEW_MODE>;
export type TaskSortBy = ValueOf<typeof TASK_SORT_BY_FILTER>;
export type TaskStatusFilter = ValueOf<typeof TASK_STATUS_FILTER>;
export type TaskPriorityFilter = ValueOf<typeof TASK_PRIORITY_FILTER>;

export type TasksFiltersValue = {
    status: TaskStatusFilter;
    priority: TaskPriorityFilter;
    sortBy: TaskSortBy;
};
