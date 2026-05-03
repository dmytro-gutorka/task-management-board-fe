import { LayoutGrid, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    ToggleGroup,
    ToggleGroupItem,
} from '../../../../shared/components/shadcn/ui/toggle-group.tsx';
import { cn } from '../../../../shared/helpers/shadcn.utils.ts';
import { IconTooltip } from '../../../../shared/components/icon-tooltip.tsx';
import { TASK_VIEW_MODE } from '../../model/task-filters/tasks-filter.constants.ts';
import type { TaskViewMode } from '../../model/task-filters/tasks-filter.types.ts';

interface TasksViewSwitcherProps {
    view: TaskViewMode;
    onTaskViewChange: (view: TaskViewMode) => void;
}

const activeViewStyles = 'bg-background text-foreground shadow-sm border-border';
const inactiveViewStyles = 'text-muted-foreground hover:text-foreground';

export function TasksViewSwitcher({ view, onTaskViewChange }: TasksViewSwitcherProps) {
    const { t } = useTranslation('common');

    return (
        <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value: TaskViewMode) => onTaskViewChange(value)}
            className="rounded-lg border bg-muted/40 p-1 ml-4"
        >
            <IconTooltip content={t('view.list')}>
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
            <IconTooltip content={t('view.grid')}>
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
