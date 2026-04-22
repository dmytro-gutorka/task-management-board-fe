import { mockTasks } from '@/pages/tasks/TasksPage/model/task-card/task-card.data';
import type { Task } from '@/pages/tasks/TasksPage/model/task-card/task-card.types';
import { TaskGridCard } from '@/pages/tasks/TasksPage/ui/card/tasks-card-grid';

export function TasksGridView() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 p-4">
            {mockTasks.map((task: Task) => (
                <TaskGridCard key={task.id} task={task} />
            ))}
        </div>
    );
}
