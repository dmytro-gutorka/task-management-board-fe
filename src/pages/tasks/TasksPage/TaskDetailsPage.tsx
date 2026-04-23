import { ArrowLeft, Calendar, User, Lock, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatDeadline } from '@/pages/tasks/TasksPage/helpers/formatDeadline';
import { getAvatarFallback } from '@/pages/tasks/TasksPage/helpers/getAvatarFallback';
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar';
import { mockTasks } from '@/pages/tasks/TasksPage/model/task-card/task-card.data';
import {
    taskPriorityConfig,
    taskStatusConfig,
} from '@/pages/tasks/TasksPage/model/task-card/task-card.configs';
import { Badge } from '@/components/ui/badge';
import { BadgeList } from '@/shared/components/badge-list';
import { EditTaskModal } from '@/pages/tasks/TasksPage/ui/task-modals/edit-task-modal';

export function TaskDetailsPage() {
    const navigate = useNavigate();
    const { taskId = '' } = useParams<{ taskId: string }>();

    const task = mockTasks.find((task) => task.id === taskId);

    if (!task) return null; // will be handled later, when backend will be ready

    const status = taskStatusConfig[task.status];
    const StatusIcon = status.icon;

    const priority = taskPriorityConfig[task.priority];

    return (
        <main className="min-h-svh bg-background">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4">
                    <Button variant="outline" onClick={() => void navigate('/tasks')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to tasks
                    </Button>
                    <EditTaskModal />
                </div>
                <Card className="rounded-2xl">
                    <CardHeader className="space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="space-y-3">
                                <CardTitle className="text-2xl leading-tight">
                                    {task.title}
                                </CardTitle>
                                <div className="flex flex-wrap gap-2">
                                    <Badge className={`gap-1 ${status.badgeClassName}`}>
                                        <StatusIcon />
                                        {status.badgeTitle}
                                    </Badge>
                                    <Badge className={`gap-1 ${priority.badgeClassName}`}>
                                        <Flag className="h-3.5 w-3.5" />
                                        {priority.badgeTitle}
                                    </Badge>
                                    {task.isPrivate ? (
                                        <Badge className="gap-1">
                                            <Lock />
                                            Private
                                        </Badge>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <section className="space-y-2">
                            <h2 className="text-sm font-medium text-muted-foreground">
                                Description
                            </h2>
                            <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                                {task.description}
                            </p>
                        </section>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border p-4">
                                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                                    <Calendar className="h-4 w-4" />
                                    Deadline
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {formatDeadline(task.deadline)}
                                </p>
                            </div>

                            <div className="rounded-xl border p-4">
                                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                                    <User className="h-4 w-4" />
                                    Assignee
                                </div>

                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={undefined} />
                                        <AvatarFallback>
                                            {getAvatarFallback(task.assignee?.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="text-sm font-medium">
                                            {task.assignee?.name || 'Unassigned'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Task owner</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="space-y-3">
                            {task.tags?.length ? (
                                <BadgeList badges={task.tags} variant="default" />
                            ) : (
                                <p className="text-sm text-muted-foreground">No tags</p>
                            )}
                        </section>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
