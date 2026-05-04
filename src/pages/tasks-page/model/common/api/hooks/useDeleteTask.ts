import { useState } from 'react';
import { TasksApiService } from '../tasks.api-service.ts';

export function useDeleteTask() {
    const [isLoading, setIsLoading] = useState(false);

    async function deleteTask(taskId: string) {
        try {
            setIsLoading(true);

            await TasksApiService.delete(taskId);

            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteTask, isLoading };
}
