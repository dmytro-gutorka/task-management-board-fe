import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SearchInput } from '@/shared/components/search-input';
import { TasksViewSwitcher } from '@/pages/tasks/TasksPage/ui/tasks-view-switcher';
import {
    type TasksFiltersValue,
    type TaskViewMode,
} from '@/pages/tasks/TasksPage/model/tasks.types';
import { useState } from 'react';
import { TASK_VIEW_MODE } from '@/pages/tasks/TasksPage/model/tasks.constants';
import { TasksFiltersMenu } from '@/pages/tasks/TasksPage/ui/tasks-filters-menu';

const initialFilters: TasksFiltersValue = {
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
};

export function Header() {
    const [viewMode, setViewMode] = useState<TaskViewMode>(TASK_VIEW_MODE.LIST);
    const [filters, setFilters] = useState<TasksFiltersValue>(initialFilters);

    return (
        <div className="">
            <div className="space-y-1">
                <h2 className="text-5xl font-semibold">Tasks #NUMBER OF TASKS</h2>
            </div>
            <Button size="icon" aria-label="Create task">
                <Plus className="h-4 w-4" />
            </Button>
            <TasksViewSwitcher view={viewMode} onViewChange={setViewMode} />
            <SearchInput />
            <TasksFiltersMenu filters={filters} onFilterChange={setFilters} />
        </div>
    );
}
