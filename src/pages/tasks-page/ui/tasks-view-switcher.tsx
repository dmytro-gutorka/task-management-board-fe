import { LayoutGrid, List } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/shared/components/shadcn/ui/toggle-group';
import { cn } from '@/shared/lib/utils';
import { IconTooltip } from '@/shared/components/icon-tooltip';
import { TASK_VIEW_MODE } from '../model/task-filters/tasks-filter.constants.ts';
import type { TaskViewMode } from '../model/task-filters/tasks-filter.types.ts';

interface TasksViewSwitcherProps {
    view: TaskViewMode;
    onViewChange: (view: TaskViewMode) => void;
}

const activeViewStyles = 'bg-background text-foreground shadow-sm border-border';
const inactiveViewStyles = 'text-muted-foreground hover:text-foreground';

export function TasksViewSwitcher({ view, onViewChange }: TasksViewSwitcherProps) {
    function onValueChange(value: TaskViewMode) {
        if (value === TASK_VIEW_MODE.LIST || value === TASK_VIEW_MODE.GRID) {
            onViewChange(value);
        }
    }
    return (
        <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value: TaskViewMode) => onValueChange(value)}
            className="rounded-lg border bg-muted/40 p-1 ml-4"
        >
            <IconTooltip content="List view">
                <ToggleGroupItem
                    value={TASK_VIEW_MODE.LIST}
                    aria-label="List view"
                    className={cn(
                        'h-8 w-8 rounded-md border border-transparent transition-colors',
                        view === 'list' ? activeViewStyles : inactiveViewStyles,
                    )}
                >
                    <List className="h-4 w-4" />
                </ToggleGroupItem>
            </IconTooltip>
            <IconTooltip content="Grid view">
                <ToggleGroupItem
                    value={TASK_VIEW_MODE.GRID}
                    aria-label="Grid view"
                    className={cn(
                        'h-8 w-8 rounded-md border border-transparent transition-colors',
                        view === 'grid' ? activeViewStyles : inactiveViewStyles,
                    )}
                >
                    <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
            </IconTooltip>
        </ToggleGroup>
    );
}
