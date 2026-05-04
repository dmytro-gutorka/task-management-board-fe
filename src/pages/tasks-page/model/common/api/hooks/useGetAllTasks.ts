import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import type { Task } from '../../../../../../shared/modules/tasks/common/model/task.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

export function useGetAllTasks(setTasks: Dispatch<SetStateAction<Task[]>>) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getTasks() {
            try {
                setIsLoading(true);
                const tasks = await TasksApiService.findAll();

                setTasks(tasks);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }

        void getTasks();
    }, []);

    return { isLoading };
}
