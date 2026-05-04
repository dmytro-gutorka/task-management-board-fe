import { useState } from 'react';
import type { TaskFormValues } from '../../../../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useCreateTasks() {
    const [isLoading, setIsLoading] = useState(false);

    async function createTask(values: TaskFormValues) {
        try {
            setIsLoading(true);
            const task = await TasksApiService.create(values);

            setIsLoading(false);
            return task;
        } finally {
            setIsLoading(false);
        }
    }

    return { createTask, isLoading };
}
