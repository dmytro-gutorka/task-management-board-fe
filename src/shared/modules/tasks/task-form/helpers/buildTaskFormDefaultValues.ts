import { formatIsoDateTime } from '../../../../helpers/formatIsoDateTime.ts';
import type { TaskFormInitialValues, TaskFormValues } from '../model/tasks-form.types.ts';
import { taskFormDefaultValues } from '../model/tasks-form.data.ts';

export function buildTaskFormDefaultValues(
    initialValues?: Partial<TaskFormInitialValues>,
): TaskFormValues {
    return {
        ...taskFormDefaultValues,
        ...initialValues,
        deadline: formatIsoDateTime(initialValues?.deadline),
    };
}
