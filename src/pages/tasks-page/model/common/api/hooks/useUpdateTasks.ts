import { useState } from 'react';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';
import type { Task } from '../../../../../../shared/modules/tasks/common/model/task.types.ts';
import type { TaskFormValues } from '../../../../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useUpdateTasks() {
    const [isLoading, setIsLoading] = useState(false);

    async function updateTask(values: TaskFormValues, taskId: string): Promise<Task | void> {
        try {
            setIsLoading(true);
            const updatedTask = await TasksApiService.update(values, taskId);

            setIsLoading(false);
            return updatedTask;
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { updateTask, isLoading };
}
