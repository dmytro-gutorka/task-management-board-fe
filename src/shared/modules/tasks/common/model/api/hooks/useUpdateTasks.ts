import { useState } from 'react';
import { handleError } from '../../../../../../infrastructure/errors/handle-error.ts';
import type { TaskFormValues } from '../../../../task-form/model/tasks-form.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useUpdateTasks() {
    const [isLoading, setIsLoading] = useState(false);

    async function updateTask(values: TaskFormValues, taskId: string) {
        try {
            setIsLoading(true);
            return await TasksApiService.update(values, taskId);
        } catch (error: unknown) {
            handleError(error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    return { updateTask, isLoading };
}
