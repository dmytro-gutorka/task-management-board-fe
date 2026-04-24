import { Outlet } from 'react-router-dom';
import { Header } from './header';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';
import { useTasksQueryState } from '@/pages/tasks/TasksPage/hooks/useTasksQueryState';

export type LayoutOutletContext = {
    viewMode: TaskViewMode;
    searchValue: string;
    filters: {
        status: TaskStatusFilter;
        priority: TaskPriorityFilter;
        sortBy: TaskSortBy;
    };
};

export function Layout() {
    const tasksQuery = useTasksQueryState();

    return (
        <div>
            <Header
                taskViewMode={tasksQuery.state.view}
                onTaskViewModeChange={tasksQuery.setView}
                filters={tasksQuery.state}
                onFiltersChange={tasksQuery.updateParams}
                searchValue={tasksQuery.state.search}
                setSearchValue={tasksQuery.setSearch}
            />

            <Outlet
                context={{
                    viewMode: tasksQuery.state.view,
                    searchValue: tasksQuery.state.search,
                    filters: {
                        status: tasksQuery.state.status,
                        priority: tasksQuery.state.priority,
                        sortBy: tasksQuery.state.sortBy,
                    },
                }}
            />
        </div>
    );
}
