import { useState } from 'react';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';
import type { Task } from '../../../../../../shared/modules/tasks/common/model/task.types.ts';
import type { TaskFormValues } from '../../../../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useCreateTasks() {
    const [isLoading, setIsLoading] = useState(false);

    async function createTask(values: TaskFormValues): Promise<Task | void> {
        try {
            setIsLoading(true);
            const task = await TasksApiService.create(values);

            setIsLoading(false);
            return task;
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { createTask, isLoading };
}
