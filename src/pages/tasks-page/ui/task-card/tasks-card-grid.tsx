import { generatePath, Link } from 'react-router-dom';
import { Calendar, Check, Lock, Info, Circle, Flag } from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/shared/components/shadcn/ui/card';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/ui/avatar';
import { logger } from '@/shared/lib/logger';
import { type Task } from '@/pages/tasks-page/model/task-card/task-card.types';
import {
    taskPriorityConfig,
    taskStatusConfig,
} from '@/pages/tasks-page/model/task-card/task-card.configs';
import { formatDeadline } from '@/pages/tasks-page/helpers/formatDeadline';
import { getAvatarFallback } from '@/pages/tasks-page/helpers/getAvatarFallback';
import { BadgeList } from '@/shared/components/badge-list';
import { DeleteTaskModal } from '@/pages/tasks-page/ui/task-modals/delete-task-modal';
import { EditTaskModal } from '@/pages/tasks-page/ui/task-modals/edit-task-modal';
import { ROUTES } from '@/app/routes/routes.constants';

interface TaskGridCardProps {
    task: Task;
    onComplete?: (taskId: string) => void;
    onDelete?: (taskId: string) => void;
}

export function TaskGridCard({ task, onComplete }: TaskGridCardProps) {
    const statusBadgeStyles = taskStatusConfig[task.status].badgeClassName;
    const statusBadgeTitle = taskStatusConfig[task.status].badgeTitle;

    const priorityBadgeStyles = taskPriorityConfig[task.priority].badgeClassName;
    const priorityBadgeTitle = taskPriorityConfig[task.priority].badgeTitle;

    const taskDetailsPagePath = generatePath(ROUTES.TASKS_DETAILS_PAGE, {
        taskId: task.id,
    });

    return (
        <>
            <Card className="flex h-full flex-col rounded-2xl">
                <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-2">
                            <CardTitle className="line-clamp-2 text-lg leading-snug">
                                {task.title}
                            </CardTitle>

                            <CardDescription className="line-clamp-3 text-sm leading-6">
                                {task.description}
                            </CardDescription>
                        </div>

                        {task.isPrivate ? (
                            <Badge variant="outline" className="shrink-0 gap-1">
                                <Lock className="h-3.5 w-3.5" />
                                Private
                            </Badge>
                        ) : null}
                    </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge className={`gap-1 ${statusBadgeStyles}`}>
                            <Circle className="h-3 w-3 fill-current" />
                            {statusBadgeTitle}
                        </Badge>

                        <Badge className={`gap-1 ${priorityBadgeStyles}`}>
                            <Flag className="h-3.5 w-3.5" />
                            {priorityBadgeTitle}
                        </Badge>
                    </div>

                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>{formatDeadline(task.deadline)}</span>
                        </div>
                        <BadgeList badges={task.tags} variant="secondary" />
                    </div>

                    <div className="mt-auto flex items-center gap-3 rounded-xl border p-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={task.assignee?.avatarUrl ?? undefined} />
                            <AvatarFallback>
                                {getAvatarFallback(task.assignee?.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                {task.assignee?.name ?? 'Unassigned'}
                            </p>
                            <p className="text-xs text-muted-foreground">Assignee</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="grid grid-cols-2 gap-2 border-t pt-4">
                    <EditTaskModal />
                    <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link to={taskDetailsPagePath}>
                            <Info className="h-4 w-4" />
                            Details
                        </Link>
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                            onComplete?.(task.id);
                            logger.log('TODO: confirm complete task', task.id);
                        }}
                        disabled={task.status === 'done'}
                    >
                        <Check className="h-4 w-4" />
                        Complete
                    </Button>
                    <DeleteTaskModal />
                </CardFooter>
            </Card>
        </>
    );
}
