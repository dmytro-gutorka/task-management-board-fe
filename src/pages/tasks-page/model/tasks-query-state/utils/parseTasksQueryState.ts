import { defaultTasksQueryState, TASKS_QUERY_PARAMS } from '../tasks-query-state.constants.ts';
import type { TasksQueryState } from '../tasks-query-state.types.ts';
import { isTaskPriorityFilter, isTaskSortBy, isTaskStatusFilter } from './typeChekers.ts';

export function parseTasksQueryState(searchParams: URLSearchParams): TasksQueryState {
    const statusParam = searchParams.get(TASKS_QUERY_PARAMS.STATUS);
    const priorityParam = searchParams.get(TASKS_QUERY_PARAMS.PRIORITY);
    const sortByParam = searchParams.get(TASKS_QUERY_PARAMS.SORT_BY);
    const qParam = searchParams.get(TASKS_QUERY_PARAMS.Q);
    const searchByParam = searchParams.get(TASKS_QUERY_PARAMS.SEARCH_BY);
    // TODO: 4 Come up with a better/reusable way to handle this

    return {
        q: qParam ?? defaultTasksQueryState.q,
        searchBy: searchByParam ?? defaultTasksQueryState.searchBy,
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
