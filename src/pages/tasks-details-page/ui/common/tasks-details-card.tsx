import { useTranslation } from 'react-i18next';
import { Calendar, User, Lock, Flag } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../shared/components/shadcn/ui/card.tsx';
import { formatDeadline } from '../../../../shared/modules/tasks/common/model/helpers/formatDeadline.ts';
import type { Task } from '../../../../shared/modules/tasks/common/model/task.types.ts';
import {
    getTaskPriorityConfig,
    getTaskStatusConfig,
} from '../../../../shared/modules/tasks/task-card/model/task-card.configs.ts';
import { Badge } from '../../../../shared/components/shadcn/ui/badge.tsx';

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
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
