import { useAsyncAction } from '../../../../../../hooks/useAsyncAction.ts';
import type { TaskFormValues } from '../../../../task-form/model/tasks-form.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useCreateTask() {
    const createTaskRequest = (values: TaskFormValues) => TasksApiService.create(values);

    const { execute, isLoading } = useAsyncAction(createTaskRequest);

    return { createTask: execute, isLoading };
}
