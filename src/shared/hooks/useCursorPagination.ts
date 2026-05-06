import {
    type Dispatch,
    type SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import axios from 'axios';
import { buildCursorQueryParams } from '../helpers/buildCursorQueryParams.ts';
import { mapCursorQueryParams } from '../helpers/mappers/mapQueryParams.ts';
import { handleError } from '../infrastructure/errors/handle-error.ts';
import type { CursorPaginationResponse, CursorParam, CursorParams } from '../types/common.ts';

export function useCursorPagination<
    RequestData extends { id: string },
    ResponseBody extends CursorPaginationResponse<RequestData>,
>(
    apiRequest: (params: CursorParams, signal: AbortSignal) => Promise<ResponseBody>,
    setItems: Dispatch<SetStateAction<RequestData[]>>,
    enabled: boolean,
    limit: number = 10,
) {
    const [nextCursor, setNextCursor] = useState<CursorParam>(null);
    const [isFirstPageLoading, setIsFirstPageLoading] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

    const firstPageControllerRef = useRef<AbortController | null>(null);
    const nextPageControllerRef = useRef<AbortController | null>(null);

    const hasNextPage = nextCursor !== null;

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
                setNextCursor(null);
                setItems([]);

                const urlSearchParams = buildCursorQueryParams(null, limit);
                const cursorParams = mapCursorQueryParams(urlSearchParams);

                const page = await apiRequest(cursorParams, controller.signal);

                if (controller.signal.aborted) return;

                setItems((prevItems) => [...prevItems, ...page.items]);
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
    }, [apiRequest, enabled, limit, setItems]);

    const fetchNextPage = useCallback(async () => {
        if (!nextCursor || isFetchingNextPage || isFirstPageLoading) return;

        const controller = new AbortController();

        nextPageControllerRef.current?.abort();
        nextPageControllerRef.current = controller;

        try {
            setIsFetchingNextPage(true);

            const urlSearchParams = buildCursorQueryParams(nextCursor, limit);
            const cursorParams = mapCursorQueryParams(urlSearchParams);

            const page = await apiRequest(cursorParams, controller.signal);

            if (controller.signal.aborted) return;

            setItems((prevItems) => [...prevItems, ...page.items]);
            setNextCursor(page.nextCursor);
        } catch (error) {
            if (axios.isCancel(error)) return;
            handleError(error);
        } finally {
            if (!controller.signal.aborted) setIsFetchingNextPage(false);
        }
    }, [nextCursor, isFetchingNextPage, isFirstPageLoading, limit, apiRequest, setItems]);

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
