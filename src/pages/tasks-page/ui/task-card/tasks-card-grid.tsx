import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { Calendar, Lock, Info, Circle, Flag, Pencil, Trash2 } from 'lucide-react';
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
import { ROUTES } from '../../../../shared/constants/routes.constants.ts';
import { formatDeadline } from '../../../../shared/modules/tasks/common/model/helpers/formatDeadline.ts';
import type { Task } from '../../../../shared/modules/tasks/common/model/task.types.ts';
import {
    getTaskPriorityConfig,
    getTaskStatusConfig,
} from '../../../../shared/modules/tasks/task-card/model/task-card.configs.ts';

interface TaskGridCardProps {
    task: Task;
    onOpenEditModal: (task: Task) => void;
    onOpenDeleteModal: (task: Task) => void;
}

export function TaskGridCard({ task, onOpenEditModal, onOpenDeleteModal }: TaskGridCardProps) {
    const { t } = useTranslation(['common', 'tasks']);

    const statusConfig = getTaskStatusConfig(t)[task.status];
    const priorityConfig = getTaskPriorityConfig(t)[task.priority];

    const taskDetailsPagePath = generatePath(ROUTES.TASKS_DETAILS_PAGE, {
        taskId: task.id,
    });

    const taskDeadline = formatDeadline(task.deadline) ?? t('defaults.noDeadline', { ns: 'tasks' });

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
                        <Badge className={`gap-1 ${statusConfig.badgeClassName}`}>
                            <Circle className="h-3 w-3 fill-current" />
                            {statusConfig.badgeTitle}
                        </Badge>

                        <Badge className={`gap-1 ${priorityConfig.badgeClassName}`}>
                            <Flag className="h-3.5 w-3.5" />
                            {priorityConfig.badgeTitle}
                        </Badge>
                    </div>

                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>{taskDeadline}</span>
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
                        {t('edit')}
                    </Button>

                    <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link to={taskDetailsPagePath}>
                            <Info className="h-4 w-4" />
                            {t('details')}
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => onOpenDeleteModal(task)}
                    >
                        <Trash2 className="h-4 w-4" />
                        {t('delete')}
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
