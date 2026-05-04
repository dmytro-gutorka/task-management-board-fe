import axios from 'axios';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';
import type { Task } from '../../../../../../shared/modules/tasks/common/model/task.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useGetAllTasks(setTasks: Dispatch<SetStateAction<Task[]>>, queryString: string) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const query = new URLSearchParams(queryString);

        async function getTasks() {
            try {
                setIsLoading(true);
                const tasks = await TasksApiService.findAll(query, controller.signal);

                setTasks(tasks);
            } catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }

                handleError(error);
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        void getTasks();

        return () => controller.abort();
    }, [queryString, setTasks]);

    return { isLoading };
}
