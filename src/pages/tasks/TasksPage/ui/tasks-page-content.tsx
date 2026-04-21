import { TaskGridCard } from '@/pages/tasks/TasksPage/ui/card/tasks-card-grid-view';
import { type GridTask } from '@/pages/tasks/TasksPage/model/task-card/task-card.types';
import { mockTasks } from '@/pages/tasks/TasksPage/model/task-card/task-card.data';

export const TasksPageContent = () => {
    return (
        <div className="flex justify-between gap-1 flex-wrap p-4">
            {mockTasks.map((mockTask: GridTask) => (
                <TaskGridCard key={mockTask.id} task={mockTask} />
            ))}
        </div>
    );
};
