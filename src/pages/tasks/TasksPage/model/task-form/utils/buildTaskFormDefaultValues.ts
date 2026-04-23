import type {
    TaskFormInitialValues,
    TaskFormValues,
} from '@/pages/tasks/TasksPage/model/task-form/tasks-form.types';
import { taskFormDefaultValues } from '@/pages/tasks/TasksPage/model/task-form/task-from.data';

export function buildTaskFormDefaultValues(
    initialValues?: Partial<TaskFormInitialValues>,
): TaskFormValues {
    return {
        ...taskFormDefaultValues,
        ...initialValues,
    };
}
