import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type {
    TaskFilterPriority,
    TaskFilterSortBy,
    TaskFilterStatus,
    TasksFiltersValue,
} from '../model/task-filters/tasks-filter.types';
import { DropDownMenuBlock } from '@/shared/components/drop-down-menu-block';
import {
    taskFilterPriorityOptions,
    taskFilterSortOptions,
    taskFilterStatusOptions,
} from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.configs';
import { IconTooltip } from '@/shared/components/icon-tooltip';

interface TasksFiltersMenuProps {
    filters: TasksFiltersValue;
    onFilterChange: (value: TasksFiltersValue) => void;
}

export function TasksFiltersMenu({ filters, onFilterChange }: TasksFiltersMenuProps) {
    const handleStatusChange = (status: string) => {
        onFilterChange({
            ...filters,
            status: status as TaskFilterStatus,
        });
    };

    const handlePriorityChange = (priority: string) => {
        onFilterChange({
            ...filters,
            priority: priority as TaskFilterPriority,
        });
    };

    const handleSortByChange = (sortBy: string) => {
        onFilterChange({
            ...filters,
            sortBy: sortBy as TaskFilterSortBy,
        });
    };

    return (
        <DropdownMenu>
            <IconTooltip content="Filters">
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
            </IconTooltip>

            <DropdownMenuContent align="end" className="w-64">
                <DropDownMenuBlock
                    title="Status"
                    value={filters.status}
                    onChange={(status) => handleStatusChange(status)}
                    options={taskFilterStatusOptions}
                />

                <DropdownMenuSeparator />

                <DropDownMenuBlock
                    title="Priority"
                    value={filters.priority}
                    onChange={(priority) => handlePriorityChange(priority)}
                    options={taskFilterPriorityOptions}
                />

                <DropdownMenuSeparator />

                <DropDownMenuBlock
                    title="Sort by"
                    value={filters.sortBy}
                    onChange={(sortBy) => handleSortByChange(sortBy)}
                    options={taskFilterSortOptions}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
