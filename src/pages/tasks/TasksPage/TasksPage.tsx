import { TasksGridView } from '@/pages/tasks/TasksPage/ui/task-card/tasks-grid-view';
import { TasksListView } from '@/pages/tasks/TasksPage/ui/task-card/tasks-list-view';
import { useMemo } from 'react';
import { getFilteredAndSortedTasks } from '@/pages/tasks/TasksPage/helpers/getFilteredAndSortedTasks';
import { mockTasks } from '@/pages/tasks/TasksPage/model/task-card/task-card.data';
import { useTasksQueryState } from '@/pages/tasks/TasksPage/hooks/useTasksQueryState';
import { TaskPageHeader } from '@/pages/tasks/TasksPage/TaskPageHeader';

export function TasksPage() {
    const { view, status, search, sortBy, priority } = useTasksQueryState().state;
    const { setSearch, setView, updateParams } = useTasksQueryState();

    const filters = useMemo(() => {
        return { status, sortBy, priority };
    }, [status, sortBy, priority]);

    const filteredTasks = useMemo(() => {
        return getFilteredAndSortedTasks(mockTasks, filters, search);
    }, [filters, search]);

    return (
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            <TaskPageHeader
                taskViewMode={view}
                searchValue={search}
                filters={filters}
                onTaskViewModeChange={setView}
                setSearchValue={setSearch}
                onFiltersChange={updateParams}
            />
            <div>
                {view === 'grid' ? (
                    <TasksGridView tasks={filteredTasks} />
                ) : (
                    <TasksListView tasks={filteredTasks} />
                )}
            </div>
        </div>
    );
}
