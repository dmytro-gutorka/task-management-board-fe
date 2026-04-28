import { TasksGridView } from '@/pages/tasks-page/ui/task-card/tasks-grid-view';
import { TasksListView } from '@/pages/tasks-page/ui/task-card/tasks-list-view';
import { getFilteredAndSortedTasks } from '@/pages/tasks-page/helpers/getFilteredAndSortedTasks';
import { mockTasks } from '@/pages/tasks-page/model/task-card/task-card.data';
import { useTasksQueryState } from '@/pages/tasks-page/hooks/useTasksQueryState';
import { TaskPageHeader } from '@/pages/tasks-page/ui/task-page-header';
import { useMemo } from 'react';

export function TasksPage() {
    const {
        state: { view, status, search, sortBy, priority },
        setSearch,
        setView,
        updateParams,
    } = useTasksQueryState();

    const filter = { status, sortBy, priority };
    const filteredTasks = useMemo(() => {
        return getFilteredAndSortedTasks(mockTasks, { status, sortBy, priority }, search);
    }, [status, sortBy, priority, search]);

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
