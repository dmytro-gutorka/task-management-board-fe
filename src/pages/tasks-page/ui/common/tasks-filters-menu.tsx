import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../shared/components/shadcn/ui/button.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../../shared/components/shadcn/ui/dropdown-menu.tsx';
import {
    getTaskFilterPriorityOptions,
    getTaskFilterSortOptions,
    getTaskFilterStatusOptions,
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
    const { t } = useTranslation(['common', 'tasks']);

    return (
        <DropdownMenu>
            <IconTooltip content={t('filters', { ns: 'common' })}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Filters">
                        <Filter className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
            </IconTooltip>

            <DropdownMenuContent align="end" className="w-64">
                <DropDownMenuBlock
                    title={t('filters.status', { ns: 'tasks' })}
                    value={filters.status}
                    onChange={(status) => onStatusChange(status)}
                    options={getTaskFilterStatusOptions(t)}
                />

                <DropdownMenuSeparator />

                <DropDownMenuBlock
                    title={t('filters.priority', { ns: 'tasks' })}
                    value={filters.priority}
                    onChange={(priority) => onPriorityChange(priority)}
                    options={getTaskFilterPriorityOptions(t)}
                />

                <DropdownMenuSeparator />

                <DropDownMenuBlock
                    title={t('filters.sortBy', { ns: 'tasks' })}
                    value={filters.sortBy}
                    onChange={(sortBy) => onSortByChange(sortBy)}
                    options={getTaskFilterSortOptions(t)}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
