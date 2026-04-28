import type {
    TaskPriorityFilter,
    TaskStatusFilter,
    TaskSortBy,
    TaskViewMode,
} from '@/pages/tasks-page/model/task-filters/tasks-filter.types';
import type { ValueOf } from '@/shared/types/common';
import { tasksQueryParam } from '@/pages/tasks-page/model/tasks-query-state/tasks-query-state.constants';

export type TasksQueryState = {
    view: TaskViewMode;
    status: TaskStatusFilter;
    priority: TaskPriorityFilter;
    sortBy: TaskSortBy;
    search: string;
};

export type TasksQueryParam = ValueOf<typeof tasksQueryParam>;
