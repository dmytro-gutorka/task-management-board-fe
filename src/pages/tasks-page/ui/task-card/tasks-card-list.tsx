import { TASKS_ROUTES } from '../../../../shared/constants/routes/tasks.routes.ts';
import { cn } from '../../../../shared/helpers/shadcn.utils.ts';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import type { Task } from '../../../../shared/modules/tasks/common/model/task.types.ts';
import { getTaskStatusConfig } from '../../../../shared/modules/tasks/task-card/model/task-card.configs.ts';

interface TaskListItemProps {
    task: Task;
}

export function TaskListCard({ task }: TaskListItemProps) {
    const { t } = useTranslation();

    const TaskStatusIcon = getTaskStatusConfig(t)[task.status].icon;
    const taskDetailsPagePath = generatePath(TASKS_ROUTES.TASKS_DETAILS_PAGE, {
        taskId: task.id,
    });

    return (
        <Link
            to={taskDetailsPagePath}
            className={cn(
                'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                'hover:bg-muted/50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )}
        >
            <div className="flex shrink-0 items-center justify-center">
                <TaskStatusIcon />
            </div>

            <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">{task.title}</div>
                <div className="truncate text-sm text-muted-foreground">{task.description}</div>
            </div>
        </Link>
    );
}
