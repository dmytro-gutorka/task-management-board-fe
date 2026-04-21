import { type ValueOf } from '@/shared/types/common';
import {
    TASK_VIEW_MODE,
    TASK_STATUS,
    TASK_PRIORITY,
    TASK_SORT_BY,
} from '@/pages/tasks/TasksPage/model/tasks.constants';

export type TaskViewMode = ValueOf<typeof TASK_VIEW_MODE>;

export type TaskStatusFilter = ValueOf<typeof TASK_STATUS>;
export type TaskPriorityFilter = ValueOf<typeof TASK_PRIORITY>;
export type TaskSortBy = ValueOf<typeof TASK_SORT_BY>;

export type TasksFiltersValue = {
    status: TaskStatusFilter;
    priority: TaskPriorityFilter;
    sortBy: TaskSortBy;
};

export type TaskDropdownOption<T extends string = string> = {
    value: T;
    title: string;
};
