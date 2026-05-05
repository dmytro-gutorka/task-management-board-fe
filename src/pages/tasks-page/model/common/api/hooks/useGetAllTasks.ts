import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';
import type { Task } from '../../../../../../shared/modules/tasks/common/model/task.types.ts';
import { TasksApiService } from '../tasks.api-service.ts';
import type { TasksCursor } from '../tasks.api-types.ts';

const TASKS_PAGE_LIMIT = 20;

export function useGetAllTasks(queryString: string) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [nextCursor, setNextCursor] = useState<TasksCursor>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const firstPageControllerRef = useRef<AbortController | null>(null);
    const nextPageControllerRef = useRef<AbortController | null>(null);

    const hasNextPage = nextCursor !== null;

    useEffect(() => {
        firstPageControllerRef.current?.abort();

        const controller = new AbortController();
        firstPageControllerRef.current = controller;

        async function loadFirstPage() {
            try {
                setIsLoading(true);
                setTasks([]);
                setNextCursor(null);

                const page = await TasksApiService.findPage(
                    queryString,
                    { cursor: null, limit: TASKS_PAGE_LIMIT },
                    controller.signal,
                );

                if (controller.signal.aborted) return;

                setTasks(page.items);
                setNextCursor(page.nextCursor);
            } catch (error) {
                if (axios.isCancel(error)) return;
                handleError(error);
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        void loadFirstPage();

        return () => controller.abort();
    }, [queryString, reloadKey]);

    const fetchNextPage = useCallback(async () => {
        if (!nextCursor || isFetchingNextPage || isLoading) return;

        nextPageControllerRef.current?.abort();

        const controller = new AbortController();
        nextPageControllerRef.current = controller;

        try {
            setIsFetchingNextPage(true);

            const page = await TasksApiService.findPage(
                queryString,
                { cursor: nextCursor, limit: TASKS_PAGE_LIMIT },
                controller.signal,
            );

            if (controller.signal.aborted) return;

            setTasks((prevTasks) => [...prevTasks, ...page.items]);
            setNextCursor(page.nextCursor);
        } catch (error) {
            if (axios.isCancel(error)) return;
            handleError(error);
        } finally {
            if (!controller.signal.aborted) {
                setIsFetchingNextPage(false);
            }
        }
    }, [isFetchingNextPage, isLoading, nextCursor, queryString]);

    const refetch = useCallback(() => {
        setReloadKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        return () => {
            firstPageControllerRef.current?.abort();
            nextPageControllerRef.current?.abort();
        };
    }, []);

    return {
        tasks,
        setTasks,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
    };
}
