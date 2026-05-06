import axios from 'axios';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import type { TasksQueryState } from '../../pages/tasks-page/model/tasks-query-state/tasks-query-state.types.ts';
import { cleanQueryParams } from '../helpers/mappers/mapTaskQueryParams.ts';
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
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        if (!enabled) return;

        const controller = new AbortController();

        async function loadPage() {
            try {
                setIsLoading(true);

                const params = cleanQueryParams<RequestQuery>(queryParams);
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
        }

        void loadPage();

        return () => controller.abort();
    }, [apiRequest, setItems, enabled, reloadKey, queryParams]);

    function refetchPage() {
        setReloadKey((prevKey) => prevKey + 1);
    }

    return { pagination, isLoading, refetchPage };
}
