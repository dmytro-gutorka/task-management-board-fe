import type { Task } from '@/pages/tasks/TasksPage/model/task-card/task-card.types';
import { TaskGridCard } from '@/pages/tasks/TasksPage/ui/task-card/tasks-card-grid';

interface TasksGridViewProps {
    tasks: Task[];
}

export function TasksGridView({ tasks }: TasksGridViewProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 p-4">
            {tasks.map((task: Task) => (
                <TaskGridCard key={task.id} task={task} />
            ))}
        </div>
    );
}
