import type { ValueOf } from '@/shared/types/common';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '../task-filters/tasks-filter.types.ts';
import type { tasksQueryParam } from './tasks-query-state.constants.ts';

export type TasksQueryState = {
    view: TaskViewMode;
    status: TaskStatusFilter;
    priority: TaskPriorityFilter;
    sortBy: TaskSortBy;
    search: string;
};

export type TasksQueryParam = ValueOf<typeof tasksQueryParam>;
