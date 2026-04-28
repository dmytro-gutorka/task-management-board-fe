import { cn } from '@/shared/lib/utils';
import { type Task } from '@/pages/tasks-page/model/task-card/task-card.types';
import { taskStatusConfig } from '@/pages/tasks-page/model/task-card/task-card.configs';
import { generatePath, Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routes.constants';

interface TaskListItemProps {
    task: Task;
    onClick?: (task: Task) => void;
}

export function TaskListCard({ task }: TaskListItemProps) {
    const TaskStatusIcon = taskStatusConfig[task.status].icon;
    const taskDetailsPagePath = generatePath(ROUTES.TASKS_DETAILS_PAGE, { taskId: task.id });

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
