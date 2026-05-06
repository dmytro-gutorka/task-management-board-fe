import { TASKS_QUERY_PARAMS } from '../../../pages/tasks-page/model/tasks-query-state/tasks-query-state.constants.ts';
import type { TasksQueryState } from '../../../pages/tasks-page/model/tasks-query-state/tasks-query-state.types.ts';

// export function mapTaskQueryParams(params: URLSearchParams): Partial<TasksQueryState> {
//     return {
//         search: params.get(TASKS_QUERY_PARAMS.SEARCH) || undefined,
//         page: params.get(TASKS_QUERY_PARAMS.PAGE) || undefined,
//         searchBy: params.get(TASKS_QUERY_PARAMS.SEARCH_BY) || undefined,
//         priority: params.get(TASKS_QUERY_PARAMS.PRIORITY) || undefined,
//         sortBy: params.get(TASKS_QUERY_PARAMS.SORT_BY) || undefined,
//         status: params.get(TASKS_QUERY_PARAMS.STATUS) || undefined,
//     };
// }

export function cleanQueryParams<T extends object>(params: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(params).filter(([, value]) => {
            if (value == null) return false;

            if (typeof value === 'string' && value.trim() === '') {
                return false;
            }

            return true;
        }),
    ) as Partial<T>;
}
