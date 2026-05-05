import axios from 'axios';
import { useEffect, useState } from 'react';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';
import type { Task } from '../../../../../../shared/modules/tasks/common/model/task.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';

const tasksDefaultPaginationState = {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
};

export function useGetTasksPage(queryString: string, reloadKey: number) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [pagination, setPagination] = useState(tasksDefaultPaginationState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function loadPage() {
            try {
                setIsLoading(true);

                const page = await TasksApiService.findPage(queryString, controller.signal);

                if (controller.signal.aborted) return;

                setTasks(page.items);
                setPagination({
                    page: page.page,
                    limit: page.limit,
                    total: page.total,
                    totalPages: page.totalPages,
                });
            } catch (error) {
                if (axios.isCancel(error)) return;
                handleError(error);
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }

        void loadPage();

        return () => controller.abort();
    }, [queryString, reloadKey]);

    return {
        tasks,
        setTasks,
        pagination,
        isLoading,
    };
}
