import { defaultTasksQueryState } from '../tasks-query-state.constants.ts';
import type { TasksQueryState } from '../tasks-query-state.types.ts';
import {
    isTaskPriorityFilter,
    isTaskSortBy,
    isTaskStatusFilter,
    isTaskViewMode,
} from './typeChekers.ts';

export function parseTasksQueryState(searchParams: URLSearchParams): TasksQueryState {
    const viewParam = searchParams.get('view');
    const statusParam = searchParams.get('status');
    const priorityParam = searchParams.get('priority');
    const sortByParam = searchParams.get('sortBy');
    const searchParam = searchParams.get('search');
    // TODO: 4 Come up with a better/reusable way to handle this

    return {
        view: viewParam && isTaskViewMode(viewParam) ? viewParam : defaultTasksQueryState.view,
        search: searchParam ?? defaultTasksQueryState.search,
        status:
            statusParam && isTaskStatusFilter(statusParam)
                ? statusParam
                : defaultTasksQueryState.status,
        priority:
            priorityParam && isTaskPriorityFilter(priorityParam)
                ? priorityParam
                : defaultTasksQueryState.priority,
        sortBy:
            sortByParam && isTaskSortBy(sortByParam) ? sortByParam : defaultTasksQueryState.sortBy,
    };
}
