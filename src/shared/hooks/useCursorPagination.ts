import axios from 'axios';
import {
    type Dispatch,
    type SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { GENERAL_QUERY_PARAMS } from '../constants/common.constants.ts';
import { handleError } from '../infrastructure/errors/handle-error.ts';
import { TASKS_PAGE_LIMIT } from '../../pages/tasks-page/model/common/tasks-page.constants.ts';
import type { CursorPaginationResponse, CursorParam } from '../types/common.ts';

export function useCursorPagination<
    RequestData extends { id: string },
    ResponseBody extends CursorPaginationResponse<RequestData>,
>(
    apiRequest: (cursorParams: URLSearchParams, signal: AbortSignal) => Promise<ResponseBody>,
    setItems: Dispatch<SetStateAction<RequestData[]>>,
    enabled: boolean,
) {
    const [nextCursor, setNextCursor] = useState<CursorParam>(null);
    const [isFirstPageLoading, setIsFirstPageLoading] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

    const firstPageControllerRef = useRef<AbortController | null>(null);
    const nextPageControllerRef = useRef<AbortController | null>(null);

    const hasNextPage = nextCursor !== null;

    const buildParams = useCallback((cursor?: string | null) => {
        const params = new URLSearchParams();

        params.set(GENERAL_QUERY_PARAMS.LIMIT, String(TASKS_PAGE_LIMIT));

        if (cursor) {
            params.set(GENERAL_QUERY_PARAMS.CURSOR, cursor);
        }

        return params;
    }, []);

    const setUniqueTasks = useCallback(
        (page: ResponseBody) => {
            setItems((prevTasks) => {
                const existingIds = new Set(prevTasks.map((task) => task.id));

                const uniqueNewItems = page.items.filter((task) => !existingIds.has(task.id));

                return [...prevTasks, ...uniqueNewItems];
            });
        },
        [setItems],
    );

    useEffect(() => {
        if (!enabled) return;

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

                const page = await apiRequest(buildParams(null), controller.signal);

                if (controller.signal.aborted) return;

                setUniqueTasks(page);
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
    }, [apiRequest, enabled, setItems, buildParams, setUniqueTasks]);

    const fetchNextPage = useCallback(async () => {
        if (!nextCursor || isFetchingNextPage || isFirstPageLoading) return;

        const controller = new AbortController();

        nextPageControllerRef.current?.abort();
        nextPageControllerRef.current = controller;

        try {
            setIsFetchingNextPage(true);

            const page = await apiRequest(buildParams(nextCursor), controller.signal);

            if (controller.signal.aborted) return;

            setUniqueTasks(page);
            setNextCursor(page.nextCursor);
        } catch (error) {
            if (axios.isCancel(error)) return;
            handleError(error);
        } finally {
            if (!controller.signal.aborted) setIsFetchingNextPage(false);
        }
    }, [
        nextCursor,
        isFetchingNextPage,
        isFirstPageLoading,
        apiRequest,
        buildParams,
        setUniqueTasks,
    ]);

    useEffect(() => {
        return () => {
            firstPageControllerRef.current?.abort();
            nextPageControllerRef.current?.abort();
        };
    }, []);

    return {
        isFirstPageLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    };
}
