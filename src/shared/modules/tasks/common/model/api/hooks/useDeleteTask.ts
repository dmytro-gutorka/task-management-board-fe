import { useAsyncAction } from '../../../../../../hooks/useAsyncAction.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useDeleteTask() {
    const deleteTaskRequest = (taskId: string) => TasksApiService.delete(taskId);

    const { isLoading, execute } = useAsyncAction(deleteTaskRequest);

    return { deleteTask: execute, isLoading };
}
