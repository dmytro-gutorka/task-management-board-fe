import { type ValueOf } from '@/shared/types/common';
import {
    TASK_VIEW_MODE,
    TASK_FILTER_STATUS,
    TASK_FILTER_PRIORITY,
    TASK_FILTER_SORT_BY,
} from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.constants';

export type TaskViewMode = ValueOf<typeof TASK_VIEW_MODE>;

export type TaskFilterStatus = ValueOf<typeof TASK_FILTER_STATUS>;
export type TaskFilterPriority = ValueOf<typeof TASK_FILTER_PRIORITY>;
export type TaskFilterSortBy = ValueOf<typeof TASK_FILTER_SORT_BY>;

export type TasksFiltersValue = {
    status: TaskFilterStatus;
    priority: TaskFilterPriority;
    sortBy: TaskFilterSortBy;
};

export type TaskFilterDropdownOption<T extends string = string> = {
    value: T;
    title: string;
};
