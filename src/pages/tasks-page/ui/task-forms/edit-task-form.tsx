import { TaskForm } from '@/pages/tasks-page/ui/task-form';
import {
    type TaskFormInitialValues,
    type TaskFormValues,
} from '@/pages/tasks-page/model/task-form/tasks-form.types';

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
