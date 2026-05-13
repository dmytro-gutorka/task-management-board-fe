import { useCallback, useEffect, useState } from 'react';
import { useAsyncAction } from '../../../../../../hooks/useAsyncAction.ts';
import type { Nullable } from '../../../../../../types/common.ts';
import type { Task } from '../../task.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useGetTaskById(taskId: string | null) {
    const [task, setTask] = useState<Nullable<Task>>(null);

    const getTaskByIdRequest = useCallback(
        (taskId: string, signal: AbortSignal) => TasksApiService.findById(taskId, signal),
        [],
    );

    const { isLoading, execute: getTaskById } = useAsyncAction(getTaskByIdRequest);

    useEffect(() => {
        if (!taskId) return;
        const controller = new AbortController();

        async function fetchTask() {
            const result = await getTaskById(taskId!, controller.signal);

            if (!result.ok || controller.signal.aborted) return;

            setTask(result.data);
        }

        void fetchTask();

        return () => controller.abort();
    }, [getTaskById, setTask, taskId]);

    return { isTaskLoading: isLoading, task, setTask };
}
