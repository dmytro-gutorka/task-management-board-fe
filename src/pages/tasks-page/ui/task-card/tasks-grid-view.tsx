import type { Task } from '../../../../shared/modules/tasks/model/task/task.types.ts';
import { TaskGridCard } from './tasks-card-grid.tsx';

interface TasksGridViewProps {
    tasks: Task[];
    onCompleteTask: (taskId: string) => void;
    onOpenEditModal: (taskId: string) => void;
    onOpenDeleteModal: (taskId: string) => void;
}

export function TasksGridView({
    tasks,
    onCompleteTask,
    onOpenEditModal,
    onOpenDeleteModal,
}: TasksGridViewProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 p-4">
            {tasks.map((task: Task) => (
                <TaskGridCard
                    key={task.id}
                    task={task}
                    onCompleteTask={onCompleteTask}
                    onOpenEditModal={onOpenEditModal}
                    onOpenDeleteModal={onOpenDeleteModal}
                />
            ))}
        </div>
    );
}
