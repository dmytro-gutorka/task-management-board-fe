import { logger } from '@/shared/lib/logger';
import { TaskListCard } from '@/pages/tasks/TasksPage/ui/task-card/tasks-card-list';
import { type Task } from '@/pages/tasks/TasksPage/model/task-card/task-card.types';

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
