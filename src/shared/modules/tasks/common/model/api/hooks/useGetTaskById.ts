import { useState } from 'react';
import { handleError } from '../../../../../../infrastructure/errors/handle-error.ts';
import type { Nullable } from '../../../../../../types/common.ts';
import type { Task } from '../../task.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useGetTaskById() {
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState<Nullable<Task>>(null);

    async function getTaskById(taskId: string) {
        try {
            setIsLoading(true);
            const task = await TasksApiService.findById(taskId);

            setTask(task);
            return task;
        } catch (error: unknown) {
            handleError(error);
            setTask(null);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    return { getTaskById, isLoading, task, setTask };
}
