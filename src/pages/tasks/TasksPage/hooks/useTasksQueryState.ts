import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tasksQueryParam } from '@/pages/tasks/TasksPage/model/tasks-query-state/tasks-query-state.constants';
import {
    type TasksQueryParam,
    type TasksQueryState,
} from '@/pages/tasks/TasksPage/model/tasks-query-state/tasks-query-state.types';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';
import { parseTasksQueryState } from '@/pages/tasks/TasksPage/model/tasks-query-state/utils/parseTasksQueryState';
import { setTasksQueryParam } from '@/pages/tasks/TasksPage/model/tasks-query-state/utils/setTasksQueryParam';

export function useTasksQueryState() {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => {
        return parseTasksQueryState(searchParams);
    }, [searchParams]);

    const updateParams = useCallback(
        (updates: Partial<TasksQueryState>) => {
            setSearchParams((prev) => {
                const nextSearchParams = new URLSearchParams(prev);
                const nextQueryState: TasksQueryState = { ...state, ...updates };

                const queryStateKeys = Object.values(tasksQueryParam);

                queryStateKeys.forEach((key: TasksQueryParam) => {
                    setTasksQueryParam(nextSearchParams, nextQueryState, key);
                });

                return nextSearchParams;
            });
        },
        [setSearchParams, state],
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
