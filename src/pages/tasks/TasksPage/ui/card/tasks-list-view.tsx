import { mockTasks } from '@/pages/tasks/TasksPage/model/task-card/task-card.data';
import { logger } from '@/shared/lib/logger';
import { TaskListCard } from '@/pages/tasks/TasksPage/ui/card/tasks-card-list';
import { type Task } from '@/pages/tasks/TasksPage/model/task-card/task-card.types';

export function TasksListView() {
    return (
        <div className="space-y-3">
            {mockTasks.map((task: Task) => (
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
