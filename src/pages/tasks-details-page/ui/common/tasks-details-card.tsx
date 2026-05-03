import { useTranslation } from 'react-i18next';
import { Calendar, User, Lock, Flag } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../shared/components/shadcn/ui/card.tsx';
import { formatDeadline } from '../../../../shared/modules/tasks/helpers/formatDeadline.ts';
import { getAvatarFallback } from '../../../tasks-page/helpers/getAvatarFallback.ts';
import {
    AvatarFallback,
    AvatarImage,
    Avatar,
} from '../../../../shared/components/shadcn/ui/avatar.tsx';
import { Badge } from '../../../../shared/components/shadcn/ui/badge.tsx';
import { BadgeList } from '../../../../shared/components/badge-list.tsx';
import {
    getTaskPriorityConfig,
    getTaskStatusConfig,
} from '../../../../shared/modules/tasks/model/task-card/task-card.configs.ts';
import type { Task } from '../../../../shared/modules/tasks/model/task/task.types.ts';

interface TasksDetailsCardProps {
    task: Task;
}

export function TasksDetailsCard({ task }: TasksDetailsCardProps) {
    const { t } = useTranslation(['common', 'tasks']);

    const statusConfig = getTaskStatusConfig(t)[task.status];
    const priorityConfig = getTaskPriorityConfig(t)[task.priority];

    const StatusIcon = statusConfig.icon;

    return (
        <Card className="rounded-2xl">
            <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-3">
                        <CardTitle className="text-2xl leading-tight">{task.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                            <Badge className={`gap-1 ${statusConfig.badgeClassName}`}>
                                <StatusIcon />
                                {statusConfig.badgeTitle}
                            </Badge>
                            <Badge className={`gap-1 ${priorityConfig.badgeClassName}`}>
                                <Flag className="h-3.5 w-3.5" />
                                {priorityConfig.badgeTitle}
                            </Badge>
                            {task.isPrivate ? (
                                <Badge className="gap-1">
                                    <Lock />
                                    {t('form.private', { ns: 'tasks' })}
                                </Badge>
                            ) : null}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <section className="space-y-2">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        {t('form.description', { ns: 'tasks' })}
                    </h2>
                    <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                        {task.description}
                    </p>
                </section>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                            <Calendar className="h-4 w-4" />
                            {t('form.deadline', { ns: 'tasks' })}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {formatDeadline(task.deadline)}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                            <User className="h-4 w-4" />
                            {t('form.assignee', { ns: 'tasks' })}
                        </div>

                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={undefined} />
                                <AvatarFallback>
                                    {getAvatarFallback(task.assigneeName)}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="text-sm font-medium">
                                    {task.assigneeName || t('form.unassigned', { ns: 'tasks' })}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {t('form.taskOwner', { ns: 'tasks' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="space-y-3">
                    {task.tags?.length ? (
                        <BadgeList badges={task.tags} variant="default" />
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            {t('form.noTags', { ns: 'tasks' })}
                        </p>
                    )}
                </section>
            </CardContent>
        </Card>
    );
}
