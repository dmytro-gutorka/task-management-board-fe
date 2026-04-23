import { TaskForm } from '@/pages/tasks/TasksPage/ui/task-form';
import { type TaskFormValues } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.types';

interface CreateTaskFormProps {
    isSubmitting?: boolean;
    onSubmit: (values: TaskFormValues) => void | Promise<void>;
    onCancel?: () => void;
}

export function CreateTaskForm({ isSubmitting, onSubmit, onCancel }: CreateTaskFormProps) {
    return (
        <TaskForm
            mode="create"
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            onCancel={onCancel}
            submitLabel="Create task"
        />
    );
}
