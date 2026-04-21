import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SearchInput } from '@/shared/components/search-input';
import { TasksViewSwitcher } from '@/pages/tasks/TasksPage/ui/tasks-view-switcher';
import { type TaskViewMode } from '@/pages/tasks/TasksPage/model/tasks.types';
import { useState } from 'react';
import { taskViewMode } from '@/pages/tasks/TasksPage/model/tasks.constants';

export function Header() {
    const [viewMode, setViewMode] = useState<TaskViewMode>(taskViewMode.list);

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
        </div>
    );
}
