import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TasksFiltersValue,
} from '../model/tasks.types';
import { DropDownMenuBlock } from '@/shared/components/drop-down-menu-block';
import {
    taskPriorityOptions,
    taskSortOptions,
    taskStatusOptions,
} from '@/pages/tasks/TasksPage/model/tasks.configs';

type TasksFiltersMenuProps = {
    filters: TasksFiltersValue;
    onFilterChange: (value: TasksFiltersValue) => void;
};

export function TasksFiltersMenu({ filters, onFilterChange }: TasksFiltersMenuProps) {
    const handleStatusChange = (status: string) => {
        onFilterChange({
            ...filters,
            status: status as TaskStatusFilter,
        });
    };

    const handlePriorityChange = (priority: string) => {
        onFilterChange({
            ...filters,
            priority: priority as TaskPriorityFilter,
        });
    };

    const handleSortByChange = (sortBy: string) => {
        onFilterChange({
            ...filters,
            sortBy: sortBy as TaskSortBy,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
                <DropDownMenuBlock
                    title="Status"
                    value={filters.status}
                    onChange={(status) => handleStatusChange(status)}
                    options={taskStatusOptions}
                />

                <DropdownMenuSeparator />

                <DropDownMenuBlock
                    title="Priority"
                    value={filters.priority}
                    onChange={(priority) => handlePriorityChange(priority)}
                    options={taskPriorityOptions}
                />

                <DropdownMenuSeparator />

                <DropDownMenuBlock
                    title="Sort by"
                    value={filters.sortBy}
                    onChange={(sortBy) => handleSortByChange(sortBy)}
                    options={taskSortOptions}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
