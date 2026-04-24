import type { TasksQueryState } from '@/pages/tasks/TasksPage/model/tasks-query-state/tasks-query-state.types';
import { defaultTasksQueryState } from '@/pages/tasks/TasksPage/model/tasks-query-state/tasks-query-state.constants';
import {
    isTaskPriorityFilter,
    isTaskSortBy,
    isTaskStatusFilter,
    isTaskViewMode,
} from '@/pages/tasks/TasksPage/model/tasks-query-state/utils/typeChekers';

export function parseTasksQueryState(searchParams: URLSearchParams): TasksQueryState {
    const viewParam = searchParams.get('view');
    const statusParam = searchParams.get('status');
    const priorityParam = searchParams.get('priority');
    const sortByParam = searchParams.get('sortBy');
    const searchParam = searchParams.get('search');
    // TODO: 4 Come up with a better/reusable way to handle this

    return {
        search: searchParam ?? defaultTasksQueryState.search,
        view: viewParam && isTaskViewMode(viewParam) ? viewParam : defaultTasksQueryState.view,
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
