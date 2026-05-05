import { format } from 'date-fns';
import type { TaskFormInitialValues, TaskFormValues } from '../model/tasks-form.types.ts';
import { taskFormDefaultValues } from '../model/tasks-form.data.ts';

export function buildTaskFormDefaultValues(
    initialValues?: Partial<TaskFormInitialValues>,
): TaskFormValues {
    let formatedDeadline;
    if (initialValues?.deadline)
        formatedDeadline = format(new Date(initialValues?.deadline), 'yyyy-MM-dd');

    return {
        ...taskFormDefaultValues,
        ...initialValues,
        deadline: formatedDeadline,
    };
}
