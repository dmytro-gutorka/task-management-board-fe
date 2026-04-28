import { TaskForm } from '@/shared/modules/tasks/ui/task-forms/task-form.tsx';
import {
    type TaskFormInitialValues,
    type TaskFormValues,
} from '@/shared/modules/tasks/model/task-form/tasks-form.types.ts';

interface EditTaskFormProps {
    initialValues: Partial<TaskFormInitialValues>;
    isSubmitting?: boolean;
    onSubmit: (values: TaskFormValues) => void | Promise<void>;
    onCancel?: () => void;
}

export function EditTaskForm({
    initialValues,
    isSubmitting,
    onSubmit,
    onCancel,
}: EditTaskFormProps) {
    return (
        <TaskForm
            mode="edit"
            initialValues={initialValues}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            onCancel={onCancel}
            submitLabel="Save changes"
        />
    );
}
