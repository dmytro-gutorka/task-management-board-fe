import axios from 'axios';
import {
    type Dispatch,
    type SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import type { TasksQueryState } from '../../pages/tasks-page/model/tasks-query-state/tasks-query-state.types.ts';
import { maoQueryParams } from '../helpers/mapQueryParams.ts';
import { handleError } from '../infrastructure/errors/handle-error.ts';
import type { PagePaginationResponse, PaginationParams } from '../types/common.ts';

const defaultPagePaginationState: PaginationParams = {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
};

export function usePagePagination<RequestData, RequestQuery extends object>(
    apiRequest: (
        searchParams: Partial<TasksQueryState>,
        signal: AbortSignal,
    ) => Promise<PagePaginationResponse<RequestData>>,
    setItems: Dispatch<SetStateAction<RequestData[]>>,
    queryParams: RequestQuery,
    enabled: boolean,
) {
    const [pagination, setPagination] = useState(defaultPagePaginationState);
    const [isLoading, setIsLoading] = useState(false);
    const controllerRef = useRef<AbortController | null>(null);

    const loadPage = useCallback(async () => {
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            setIsLoading(true);

            const params = maoQueryParams<RequestQuery>(queryParams);
            const page = await apiRequest(params, controller.signal);

            if (controller.signal.aborted) return;

            setItems(page.items);
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
    }, [apiRequest, queryParams, setItems]);

    useEffect(() => {
        if (!enabled) return;

        queueMicrotask(() => void loadPage());

        return () => controllerRef.current?.abort();
    }, [enabled, loadPage]);

    return { pagination, isLoading, refetchPage: loadPage };
}
