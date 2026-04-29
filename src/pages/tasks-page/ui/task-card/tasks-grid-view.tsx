import type { Task } from '../../../../shared/modules/tasks/model/task/task.types.ts';
import { TaskGridCard } from './tasks-card-grid.tsx';

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
