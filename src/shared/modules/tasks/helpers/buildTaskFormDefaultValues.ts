import type {
    TaskFormInitialValues,
    TaskFormValues,
} from '@/shared/modules/tasks/model/task-form/tasks-form.types.ts';
import { taskFormDefaultValues } from '@/shared/modules/tasks/model/task-form/tasks-form.data.ts';

export function buildTaskFormDefaultValues(
    initialValues?: Partial<TaskFormInitialValues>,
): TaskFormValues {
    return {
        ...taskFormDefaultValues,
        ...initialValues,
    };
}
