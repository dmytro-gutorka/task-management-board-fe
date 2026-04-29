import { Filter } from 'lucide-react';
import { Button } from '../../../../shared/components/shadcn/ui/button.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../../shared/components/shadcn/ui/dropdown-menu.tsx';
import {
    taskFilterPriorityOptions,
    taskFilterSortOptions,
    taskFilterStatusOptions,
} from '../../model/task-filters/tasks-filter.configs.ts';
import type { TasksFiltersValue } from '../../model/task-filters/tasks-filter.types.ts';
import { DropDownMenuBlock } from '../../../../shared/components/drop-down-menu-block.tsx';
import { IconTooltip } from '../../../../shared/components/icon-tooltip.tsx';

interface TasksFiltersMenuProps {
    filters: TasksFiltersValue;
    onStatusChange: (status: string) => void;
    onPriorityChange: (priority: string) => void;
    onSortByChange: (sortBy: string) => void;
}

export function TasksFiltersMenu({
    filters,
    onStatusChange,
    onPriorityChange,
    onSortByChange,
}: TasksFiltersMenuProps) {
    return (
        <DropdownMenu>
            <IconTooltip content="Filters">
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Filters">
                        <Filter className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
            </IconTooltip>

            <DropdownMenuContent align="end" className="w-64">
                <DropDownMenuBlock
                    title="Status"
                    value={filters.status}
                    onChange={(status) => onStatusChange(status)}
                    options={taskFilterStatusOptions}
                />

                <DropdownMenuSeparator />

                <DropDownMenuBlock
                    title="Priority"
                    value={filters.priority}
                    onChange={(priority) => onPriorityChange(priority)}
                    options={taskFilterPriorityOptions}
                />

                <DropdownMenuSeparator />

                <DropDownMenuBlock
                    title="Sort by"
                    value={filters.sortBy}
                    onChange={(sortBy) => onSortByChange(sortBy)}
                    options={taskFilterSortOptions}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
