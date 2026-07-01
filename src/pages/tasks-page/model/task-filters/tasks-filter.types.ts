import { type ValueOf } from '../../../../shared/types/common.ts';
import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
    type TASK_VIEW_MODE,
} from './tasks-filter.constants.ts';
import type { TaskStatus } from '../../../../shared/modules/tasks/task-card/model/task-card.types.ts';

export type TaskViewMode = ValueOf<typeof TASK_VIEW_MODE>;
export type TaskSortBy = ValueOf<typeof TASK_SORT_BY_FILTER>;
export type TaskStatusFilter = ValueOf<typeof TASK_STATUS_FILTER>;
export type TaskPriorityFilter = ValueOf<typeof TASK_PRIORITY_FILTER>;

export type TasksFiltersValue = {
    status: TaskStatusFilter;
    priority: TaskPriorityFilter;
    sortBy: TaskSortBy;
};

export interface TaskMapItem {
    id: number;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    latitude: number;
    longitude: number;
}

export interface TaskMapQueryParams {
    north: number;
    south: number;
    east: number;
    west: number;
    status?: TaskStatus;
    priority?: TaskPriority;
}
