import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';
import { TASKS_PAGE_LIMIT } from '../../tasks-page.constants.ts';
import { TasksApiService } from '../tasks.api-service.ts';
import type { Task } from '../../../../../../shared/modules/tasks/common/model/task.types.ts';
import type { TasksCursor } from '../tasks.api-types.ts';

export function useGetTasksFeed(reloadKey: number) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [nextCursor, setNextCursor] = useState<TasksCursor>(null);
    const [isFirstPageLoading, setIsFirstPageLoading] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

    const firstPageControllerRef = useRef<AbortController | null>(null);
    const nextPageControllerRef = useRef<AbortController | null>(null);

    const hasNextPage = nextCursor !== null;

    useEffect(() => {
        const controller = new AbortController();

        firstPageControllerRef.current?.abort();
        nextPageControllerRef.current?.abort();

        firstPageControllerRef.current = controller;

        async function loadFirstPage() {
            try {
                setIsFirstPageLoading(true);
                setIsFetchingNextPage(false);
                setTasks([]);
                setNextCursor(null);

                const page = await TasksApiService.findFeedPage(
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
                if (!controller.signal.aborted) setIsFirstPageLoading(false);
            }
        }

        void loadFirstPage();

        return () => controller.abort();
    }, [reloadKey]);

    const fetchNextPage = useCallback(async () => {
        if (!nextCursor || isFetchingNextPage || isFirstPageLoading) return;

        const controller = new AbortController();

        nextPageControllerRef.current?.abort();
        nextPageControllerRef.current = controller;

        try {
            setIsFetchingNextPage(true);

            const page = await TasksApiService.findFeedPage(
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
            if (!controller.signal.aborted) setIsFetchingNextPage(false);
        }
    }, [isFetchingNextPage, isFirstPageLoading, nextCursor]);

    useEffect(() => {
        return () => {
            firstPageControllerRef.current?.abort();
            nextPageControllerRef.current?.abort();
        };
    }, []);

    return {
        tasks,
        setTasks,
        isLoading: isFirstPageLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    };
}
