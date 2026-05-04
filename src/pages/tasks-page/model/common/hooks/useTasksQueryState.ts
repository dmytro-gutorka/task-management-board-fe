import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '../../task-filters/tasks-filter.types.ts';
import { tasksQueryParam } from '../../tasks-query-state/tasks-query-state.constants.ts';
import type {
    TasksQueryParam,
    TasksQueryState,
} from '../../tasks-query-state/tasks-query-state.types.ts';
import { parseTasksQueryState } from '../../tasks-query-state/utils/parseTasksQueryState.ts';
import { updateTasksQueryParam } from '../../tasks-query-state/utils/updateTasksQueryParam.ts';

export function useTasksQueryState() {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => {
        return parseTasksQueryState(searchParams);
    }, [searchParams]);

    const updateParams = useCallback(
        (updates: Partial<TasksQueryState>) => {
            setSearchParams((prev) => {
                const currentState = parseTasksQueryState(prev);

                const nextSearchParams = new URLSearchParams(prev);
                const nextQueryState: TasksQueryState = { ...currentState, ...updates };

                const queryStateKeys = Object.values(tasksQueryParam);

                queryStateKeys.forEach((key: TasksQueryParam) => {
                    updateTasksQueryParam(nextSearchParams, nextQueryState, key);
                });

                return nextSearchParams;
            });
        },
        [setSearchParams],
    );

    const setView = useCallback((view: TaskViewMode) => updateParams({ view }), [updateParams]);
    const setStatus = useCallback(
        (status: TaskStatusFilter) => updateParams({ status }),
        [updateParams],
    );
    const setPriority = useCallback(
        (priority: TaskPriorityFilter) => updateParams({ priority }),
        [updateParams],
    );
    const setSortBy = useCallback((sortBy: TaskSortBy) => updateParams({ sortBy }), [updateParams]);
    const setSearch = useCallback((search: string) => updateParams({ search }), [updateParams]);

    return {
        state,
        setView,
        setStatus,
        setPriority,
        setSortBy,
        setSearch,
        updateParams,
    };
}
