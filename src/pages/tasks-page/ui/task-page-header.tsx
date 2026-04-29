import { SearchInput } from '@/shared/components/search-input';
import { CreateTaskModal } from '@/shared/modules/tasks/ui/task-modals/create-task-modal';
import { TooltipProvider } from '@/shared/components/shadcn/ui/tooltip';
import { TasksFiltersMenu } from './tasks-filters-menu.tsx';
import { TasksViewSwitcher } from './tasks-view-switcher.tsx';
import type { TasksFiltersValue, TaskViewMode } from '../model/task-filters/tasks-filter.types.ts';

interface HeaderProps {
    taskViewMode: TaskViewMode;
    onTaskViewModeChange: (viewMode: TaskViewMode) => void;
    filters: TasksFiltersValue;
    onFiltersChange: (filters: Partial<TasksFiltersValue>) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
}

export function TaskPageHeader({
    taskViewMode,
    onTaskViewModeChange,
    filters,
    onFiltersChange,
    setSearchValue,
    searchValue,
}: HeaderProps) {
    return (
        <>
            <TooltipProvider delayDuration={150}>
                <div className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                        <h2 className="text-1xl font-semibold">Tasks 10</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <SearchInput searchValue={searchValue} setSearchChange={setSearchValue} />
                        <TasksFiltersMenu filters={filters} onFilterChange={onFiltersChange} />
                        <CreateTaskModal />
                        <TasksViewSwitcher
                            view={taskViewMode}
                            onViewChange={onTaskViewModeChange}
                        />
                    </div>
                </div>
            </TooltipProvider>
        </>
    );
}
