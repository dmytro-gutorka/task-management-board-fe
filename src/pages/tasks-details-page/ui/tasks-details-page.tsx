import { useParams } from 'react-router-dom';
import { getTaskById } from '../../../shared/modules/tasks/model/task/task.api.ts';
import { TasksDetailsCard } from './tasks-details-card.tsx';
import { TasksDetailsHeader } from './tasks-details-header.tsx';

export function TasksDetailsPage() {
    const { taskId = '' } = useParams<{ taskId: string }>();

    const task = getTaskById(taskId);

    if (!task) return null; // will be handled later, when backend will be ready

    return (
        <main className="min-h-svh bg-background">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <TasksDetailsHeader task={task} />
                <TasksDetailsCard task={task} />
            </div>
        </main>
    );
}
