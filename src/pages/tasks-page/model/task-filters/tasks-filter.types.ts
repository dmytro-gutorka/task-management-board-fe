import { type ValueOf } from '@/shared/types/common';
import {
    TASK_VIEW_MODE,
    TASK_STATUS_FILTER,
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
} from '@/pages/tasks-page/model/task-filters/tasks-filter.constants';

export type TaskViewMode = ValueOf<typeof TASK_VIEW_MODE>;
export type TaskSortBy = ValueOf<typeof TASK_SORT_BY_FILTER>;
export type TaskStatusFilter = ValueOf<typeof TASK_STATUS_FILTER>;
export type TaskPriorityFilter = ValueOf<typeof TASK_PRIORITY_FILTER>;

export type TasksFiltersValue = {
    status: TaskStatusFilter;
    priority: TaskPriorityFilter;
    sortBy: TaskSortBy;
};

export type TaskFilterDropdownOption<T extends string = string> = {
    value: T;
    title: string;
};
