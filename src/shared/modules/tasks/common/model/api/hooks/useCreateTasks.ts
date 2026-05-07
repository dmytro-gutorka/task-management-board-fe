import { useState } from 'react';
import { handleError } from '../../../../../../infrastructure/errors/handle-error.ts';
import type { TaskFormValues } from '../../../../task-form/model/tasks-form.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useCreateTasks() {
    const [isLoading, setIsLoading] = useState(false);

    async function createTask(values: TaskFormValues) {
        try {
            setIsLoading(true);
            return await TasksApiService.create(values);
        } catch (error: unknown) {
            handleError(error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    return { createTask, isLoading };
}
