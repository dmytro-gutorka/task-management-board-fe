import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SearchInput } from '@/shared/components/search-input';
import { TasksViewSwitcher } from '@/pages/tasks/TasksPage/ui/tasks-view-switcher';
import {
    type TasksFiltersValue,
    type TaskViewMode,
} from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';
import { useState } from 'react';
import { TASK_VIEW_MODE } from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.constants';
import { TasksFiltersMenu } from '@/pages/tasks/TasksPage/ui/tasks-filters-menu';
import { Separator } from '@/components/ui/separator';

const initialFilters: TasksFiltersValue = {
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
};

export function Header() {
    const [viewMode, setViewMode] = useState<TaskViewMode>(TASK_VIEW_MODE.LIST);
    const [filters, setFilters] = useState<TasksFiltersValue>(initialFilters);

    return (
        <>
            <div className="flex items-center justify-between p-4">
                <div className="space-y-1">
                    <h2 className="text-1xl font-semibold">Tasks 10</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <SearchInput />
                    <TasksFiltersMenu filters={filters} onFilterChange={setFilters} />

                    <Button variant="outline" size="icon" className="mr-2" aria-label="Create task">
                        <Plus className="h-4 w-4" />
                    </Button>
                    <TasksViewSwitcher view={viewMode} onViewChange={setViewMode} />
                </div>
            </div>
            <Separator />
        </>
    );
}
