import { logger } from '@/shared/lib/logger';
import type { Task } from '../../../../shared/modules/tasks/model/task/task.types.ts';
import { TaskListCard } from './tasks-card-list.tsx';

interface TasksGridViewProps {
    tasks: Task[];
}

export function TasksListView({ tasks }: TasksGridViewProps) {
    return (
        <div className="space-y-3">
            {tasks.map((task: Task) => (
                <TaskListCard
                    key={task.id}
                    task={task}
                    onClick={(selectedTask) => {
                        logger.log('TODO: open details modal for task', selectedTask.id);
                    }}
                />
            ))}
        </div>
    );
}
