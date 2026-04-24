import { useMemo } from 'react';
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

    const updateParams = (updates: Partial<TasksQueryState>) => {
        setSearchParams((prev) => {
            const nextSearchParams = new URLSearchParams(prev);
            const nextQueryState: TasksQueryState = { ...state, ...updates };

            const queryStateKeys = Object.values(tasksQueryParam);

            queryStateKeys.forEach((key: TasksQueryParam) => {
                setTasksQueryParam(nextSearchParams, nextQueryState, key);
            });

            return nextSearchParams;
        });
    };

    const setView = (view: TaskViewMode) => updateParams({ view });
    const setStatus = (status: TaskStatusFilter) => updateParams({ status });
    const setPriority = (priority: TaskPriorityFilter) => updateParams({ priority });
    const setSortBy = (sortBy: TaskSortBy) => updateParams({ sortBy });
    const setSearch = (search: string) => updateParams({ search });

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
