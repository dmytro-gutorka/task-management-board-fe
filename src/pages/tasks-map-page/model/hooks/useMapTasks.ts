import { useCallback, useState, useRef } from 'react';
import type {
    TaskMapItem,
    TaskMapQueryParams,
} from '../../../tasks-page/model/task-filters/tasks-filter.types.ts';
import { TasksApiService } from '../../../../shared/modules/tasks/common/model/api/tasks.api-service.ts';
import type { Nullable } from '../../../../shared/types/common.ts';

export function useMapTasks() {
    const [tasks, setTasks] = useState<TaskMapItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Nullable<string>>(null);

    const abortControllerRef = useRef<Nullable<AbortController>>(null);

    const loadMapTasks = useCallback(async (params: TaskMapQueryParams) => {
        abortControllerRef.current?.abort();

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setIsLoading(true);
        setError(null);

        try {
            const mapTasks = await TasksApiService.findMapTasks(params, abortController.signal);

            setTasks(mapTasks);
        } catch {
            if (abortController.signal.aborted) return;

            setError('Failed to load map tasks');
        } finally {
            if (!abortController.signal.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    return {
        tasks,
        isLoading,
        error,
        loadMapTasks,
    };
}
