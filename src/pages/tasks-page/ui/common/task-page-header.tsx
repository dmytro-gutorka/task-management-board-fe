import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { IconTooltip } from '../../../../shared/components/icon-tooltip.tsx';
import { SearchInput } from '../../../../shared/components/search-input.tsx';
import { Button } from '../../../../shared/components/shadcn/ui/button.tsx';
import { TooltipProvider } from '../../../../shared/components/shadcn/ui/tooltip.tsx';
import { TasksFiltersMenu } from './tasks-filters-menu.tsx';
import { TasksViewSwitcher } from './tasks-view-switcher.tsx';
import type {
    TaskPriorityFilter,
    TasksFiltersValue,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '../../model/task-filters/tasks-filter.types.ts';

interface HeaderProps {
    taskViewMode: TaskViewMode;
    onTaskViewChange: (viewMode: TaskViewMode) => void;
    filters: TasksFiltersValue;
    searchValue: string;
    setSearchValue: (value: string) => void;
    onStatusChange: (status: TaskStatusFilter) => void;
    onPriorityChange: (priority: TaskPriorityFilter) => void;
    onSortByChange: (sortBy: TaskSortBy) => void;
    openCreateModal: () => void;
    openEditModal: () => void;
    tasksCounter: number;
}

export function TaskPageHeader({
    taskViewMode,
    onTaskViewChange,
    filters,
    setSearchValue,
    searchValue,
    onStatusChange,
    onPriorityChange,
    onSortByChange,
    openCreateModal,
    tasksCounter,
}: HeaderProps) {
    const { t } = useTranslation(['common', 'tasks']);

    return (
        <>
            <TooltipProvider delayDuration={150}>
                <div className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                        <h2 className="text-1xl font-semibold">
                            {t('title', { ns: 'tasks' })} {tasksCounter}
                        </h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <SearchInput searchValue={searchValue} setSearchChange={setSearchValue} />
                        <TasksFiltersMenu
                            filters={filters}
                            onStatusChange={onStatusChange}
                            onPriorityChange={onPriorityChange}
                            onSortByChange={onSortByChange}
                        />
                        <IconTooltip content={t('createTask', { ns: 'tasks' })}>
                            <Button
                                onClick={openCreateModal}
                                variant="outline"
                                className="mr-2"
                                aria-label={t('createTask', { ns: 'tasks' })}
                                size="icon"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </IconTooltip>
                        <TasksViewSwitcher
                            view={taskViewMode}
                            onTaskViewChange={onTaskViewChange}
                        />
                    </div>
                </div>
            </TooltipProvider>
        </>
    );
}
