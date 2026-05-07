import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
} from '../../task-filters/tasks-filter.types.ts';
import { TASKS_QUERY_PARAMS } from '../../tasks-query-state/tasks-query-state.constants.ts';
import type {
    TasksQueryParam,
    TasksQueryState,
} from '../../tasks-query-state/tasks-query-state.types.ts';
import { parseTasksQueryState } from '../../tasks-query-state/utils/parseTasksQueryState.ts';
import { updateTasksQueryParam } from '../../tasks-query-state/utils/updateTasksQueryParam.ts';

export function useTasksQueryState() {
    const [searchParams, setSearchParams] = useSearchParams();

    const queryParams = useMemo(() => {
        return parseTasksQueryState(searchParams);
    }, [searchParams]);

    const updateParams = useCallback(
        (updates: Partial<TasksQueryState>) => {
            setSearchParams((prev) => {
                const currentState = parseTasksQueryState(prev);

                const nextSearchParams = new URLSearchParams(prev);
                const nextQueryState: TasksQueryState = { ...currentState, ...updates };

                const queryStateKeys = Object.values(TASKS_QUERY_PARAMS);

                queryStateKeys.forEach((key: TasksQueryParam) => {
                    updateTasksQueryParam(nextSearchParams, nextQueryState, key);
                });

                return nextSearchParams;
            });
        },
        [setSearchParams],
    );

    const setStatus = useCallback(
        (status: TaskStatusFilter) => updateParams({ status, page: '1' }),
        [updateParams],
    );
    const setPriority = useCallback(
        (priority: TaskPriorityFilter) => updateParams({ priority, page: '1' }),
        [updateParams],
    );
    const setSortBy = useCallback(
        (sortBy: TaskSortBy) => updateParams({ sortBy, page: '1' }),
        [updateParams],
    );
    const setSearch = useCallback(
        (search: string) => {
            if (search === queryParams.search) return;
            updateParams({ search, page: '1' });
        },
        [updateParams, queryParams.search],
    );

    return {
        searchParams,
        queryParams,
        setStatus,
        setPriority,
        setSortBy,
        setSearch,
        updateParams,
    };
}
