import { SearchInput } from '@/shared/components/search-input';
import { TasksViewSwitcher } from '@/pages/tasks/TasksPage/ui/tasks-view-switcher';
import {
    type TasksFiltersValue,
    type TaskViewMode,
} from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';
import { useState } from 'react';
import { TasksFiltersMenu } from '@/pages/tasks/TasksPage/ui/tasks-filters-menu';
import { Separator } from '@/components/ui/separator';
import { CreateTaskModal } from '@/pages/tasks/TasksPage/ui/task-modals/create-task-modal';
import { TooltipProvider } from '@/components/ui/tooltip';

const initialFilters: TasksFiltersValue = {
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
};

interface HeaderProps {
    taskViewMode: TaskViewMode;
    onTaskViewModeChange: (viewMode: TaskViewMode) => void;
}

export function Header({ taskViewMode, onTaskViewModeChange }: HeaderProps) {
    const [filters, setFilters] = useState<TasksFiltersValue>(initialFilters);

    return (
        <>
            <TooltipProvider delayDuration={150}>
                <div className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                        <h2 className="text-1xl font-semibold">Tasks 10</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <SearchInput />
                        <TasksFiltersMenu filters={filters} onFilterChange={setFilters} />
                        <CreateTaskModal />
                        <TasksViewSwitcher
                            view={taskViewMode}
                            onViewChange={onTaskViewModeChange}
                        />
                    </div>
                </div>
                <Separator />
            </TooltipProvider>
        </>
    );
}
