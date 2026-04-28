import { TaskForm } from '@/shared/modules/tasks/ui/task-forms/task-form.tsx';
import { type TaskFormValues } from '@/shared/modules/tasks/model/task-form/tasks-form.types.ts';

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
