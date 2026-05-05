import { useState } from 'react';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useDeleteTask() {
    const [isLoading, setIsLoading] = useState(false);

    async function deleteTask(taskId: string) {
        try {
            setIsLoading(true);

            await TasksApiService.delete(taskId);

            setIsLoading(false);
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteTask, isLoading };
}
