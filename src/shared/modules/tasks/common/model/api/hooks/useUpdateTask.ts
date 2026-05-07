import { useAsyncAction } from '../../../../../../hooks/useAsyncAction.ts';
import type { UpdateTaskPayload } from '../../task.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useUpdateTask() {
    const updateTaskRequest = (values: UpdateTaskPayload, taskId: string) =>
        TasksApiService.update(values, taskId);

    const { isLoading, execute } = useAsyncAction(updateTaskRequest);

    return { updateTask: execute, isLoading };
}
