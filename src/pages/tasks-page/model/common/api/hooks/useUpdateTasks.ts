import { useState } from 'react';
import type { TaskFormValues } from '../../../../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useUpdateTasks() {
    const [isLoading, setIsLoading] = useState(false);

    async function updateTask(values: TaskFormValues, taskId: string) {
        try {
            setIsLoading(true);
            const updatedTask = await TasksApiService.update(values, taskId);

            setIsLoading(false);
            return updatedTask;
        } finally {
            setIsLoading(false);
        }
    }

    return { updateTask, isLoading };
}
