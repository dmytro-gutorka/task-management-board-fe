import { type TaskViewMode } from '@/pages/tasks/TasksPage/model/tasks.types';
import { LayoutGrid, List } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TASK_VIEW_MODE } from '@/pages/tasks/TasksPage/model/tasks.constants';

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
        <TooltipProvider delayDuration={150}>
            <ToggleGroup
                type="single"
                value={view}
                onValueChange={(value: TaskViewMode) => onValueChange(value)}
                className="rounded-lg border bg-muted/40 p-1"
            >
                <Tooltip>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent>List view</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent>Grid view</TooltipContent>
                </Tooltip>
            </ToggleGroup>
        </TooltipProvider>
    );
}
