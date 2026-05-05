import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { handleError } from '../infrastructure/errors/handle-error.ts';
import { TASKS_PAGE_LIMIT } from '../../pages/tasks-page/model/common/tasks-page.constants.ts';
import type { CursorPaginationResponse, CursorParam, CursorParams } from '../types/common.ts';

export function useCursorPagination<
    RequestData,
    ResponseBody extends CursorPaginationResponse<RequestData>,
>(
    reloadKey: number,
    apiRequest: (cursorParams: CursorParams, signal: AbortSignal) => Promise<ResponseBody>,
) {
    const [items, setItems] = useState<RequestData[]>([]);
    const [nextCursor, setNextCursor] = useState<CursorParam>(null);
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
                setItems([]);
                setNextCursor(null);

                const page = await apiRequest(
                    { cursor: null, limit: TASKS_PAGE_LIMIT },
                    controller.signal,
                );

                if (controller.signal.aborted) return;

                setItems(page.items);
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
    }, [apiRequest, reloadKey]);

    const fetchNextPage = useCallback(async () => {
        if (!nextCursor || isFetchingNextPage || isFirstPageLoading) return;

        const controller = new AbortController();

        nextPageControllerRef.current?.abort();
        nextPageControllerRef.current = controller;

        try {
            setIsFetchingNextPage(true);

            const page = await apiRequest(
                { cursor: nextCursor, limit: TASKS_PAGE_LIMIT },
                controller.signal,
            );

            if (controller.signal.aborted) return;

            setItems((prevTasks) => [...prevTasks, ...page.items]);
            setNextCursor(page.nextCursor);
        } catch (error) {
            if (axios.isCancel(error)) return;
            handleError(error);
        } finally {
            if (!controller.signal.aborted) setIsFetchingNextPage(false);
        }
    }, [apiRequest, isFetchingNextPage, isFirstPageLoading, nextCursor]);

    useEffect(() => {
        return () => {
            firstPageControllerRef.current?.abort();
            nextPageControllerRef.current?.abort();
        };
    }, []);

    return {
        items,
        isLoading: isFirstPageLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    };
}
