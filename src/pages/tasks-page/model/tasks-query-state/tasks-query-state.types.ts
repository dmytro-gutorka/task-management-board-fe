import type { ValueOf } from '../../../../shared/types/common.ts';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
} from '../task-filters/tasks-filter.types.ts';
import { type TASKS_QUERY_PARAMS, TASKS_SEARCH_BY_PARAMS } from './tasks-query-state.constants.ts';

type TasksSearchParam = ValueOf<typeof TASKS_SEARCH_BY_PARAMS>;
export type TasksQueryParam = ValueOf<typeof TASKS_QUERY_PARAMS>;

export interface TasksQueryState {
    search: string;
    status: TaskStatusFilter;
    priority: TaskPriorityFilter;
    sortBy: TaskSortBy;
    searchBy: TasksSearchParam;
    page: string;
}
