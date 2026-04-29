import { useMemo } from 'react';
import { getTasks } from '../../../shared/modules/tasks/model/task/task.api.ts';
import { getFilteredAndSortedTasks } from '../helpers/getFilteredAndSortedTasks.ts';
import { useTasksQueryState } from '../hooks/useTasksQueryState.ts';
import { TasksGridView } from './task-card/tasks-grid-view.tsx';
import { TasksListView } from './task-card/tasks-list-view.tsx';
import { TaskPageHeader } from './task-page-header.tsx';

export function TasksPage() {
    const {
        state: { view, status, search, sortBy, priority },
        setSearch,
        setView,
        updateParams,
    } = useTasksQueryState();

    const tasks = getTasks();

    const filter = { status, sortBy, priority };
    const filteredTasks = useMemo(() => {
        return getFilteredAndSortedTasks(tasks ?? [], { status, sortBy, priority }, search);
    }, [tasks, status, sortBy, priority, search]);

    return (
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            <TaskPageHeader
                taskViewMode={view}
                searchValue={search}
                filters={filter}
                onTaskViewModeChange={setView}
                setSearchValue={setSearch}
                onFiltersChange={updateParams}
            />
            {view === 'grid' ? (
                <TasksGridView tasks={filteredTasks} />
            ) : (
                <TasksListView tasks={filteredTasks} />
            )}
        </div>
    );
}
