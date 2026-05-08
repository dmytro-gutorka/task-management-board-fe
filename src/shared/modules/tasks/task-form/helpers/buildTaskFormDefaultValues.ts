import { format } from 'date-fns';
import type { TaskFormInitialValues, TaskFormValues } from '../model/tasks-form.types.ts';
import { taskFormDefaultValues } from '../model/tasks-form.data.ts';

export function buildTaskFormDefaultValues(
    initialValues?: Partial<TaskFormInitialValues>,
): TaskFormValues {
    return {
        ...taskFormDefaultValues,
        ...initialValues,
        deadline: initialValues?.deadline ? format(initialValues?.deadline, 'yyyy-MM-dd') : '',
    };
}
