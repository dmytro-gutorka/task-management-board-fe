import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tasksQueryParam } from '@/pages/tasks-page/model/tasks-query-state/tasks-query-state.constants';
import {
    type TasksQueryParam,
    type TasksQueryState,
} from '@/pages/tasks-page/model/tasks-query-state/tasks-query-state.types';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '@/pages/tasks-page/model/task-filters/tasks-filter.types';
import { parseTasksQueryState } from '@/pages/tasks-page/model/tasks-query-state/utils/parseTasksQueryState';
import { updateTasksQueryParam } from '@/pages/tasks-page/model/tasks-query-state/utils/updateTasksQueryParam';

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
