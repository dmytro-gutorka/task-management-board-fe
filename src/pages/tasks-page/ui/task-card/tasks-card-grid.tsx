import { generatePath, Link } from 'react-router-dom';
import { Calendar, Check, Lock, Info, Circle, Flag, Pencil, Trash2 } from 'lucide-react';
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
import { Avatar } from '@/shared/components/shadcn/ui/avatar';
import {
    taskPriorityConfig,
    taskStatusConfig,
} from '@/shared/modules/tasks/model/task-card/task-card.configs.ts';
import { formatDeadline } from '@/shared/modules/tasks/helpers/formatDeadline.ts';
import { BadgeList } from '@/shared/components/badge-list';
import { ROUTES } from '@/app/routes/routes.constants';
import type { Task } from '../../../../shared/modules/tasks/model/task/task.types.ts';

interface TaskGridCardProps {
    task: Task;
    onCompleteTask: (taskId: string) => void;
    onOpenEditModal: (task: Task) => void;
    onOpenDeleteModal: (task: Task) => void;
}

export function TaskGridCard({
    task,
    onCompleteTask,
    onOpenEditModal,
    onOpenDeleteModal,
}: TaskGridCardProps) {
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
                            {/*<AvatarImage src={task.assigneeAvatarUrl ?? undefined} />*/}
                            {/*<AvatarFallback>*/}
                            {/*    {getAvatarFallback(task.assigneeAvatarUrl)}*/}
                            {/*</AvatarFallback>*/}
                        </Avatar>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                {task.assigneeName ?? 'Unassigned'}
                            </p>
                            <p className="text-xs text-muted-foreground">Assignee</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="grid grid-cols-2 gap-2 border-t pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => onOpenEditModal(task)}
                    >
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Button>

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
                        onClick={() => onCompleteTask(task.id)}
                        disabled={task.status === 'done'}
                    >
                        <Check className="h-4 w-4" />
                        Complete
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => onOpenDeleteModal(task)}
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
