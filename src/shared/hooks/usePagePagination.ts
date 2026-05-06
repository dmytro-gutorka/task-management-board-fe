import axios from 'axios';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { handleError } from '../infrastructure/errors/handle-error.ts';
import type { PagePaginationResponse, PaginationParams } from '../types/common.ts';

const defaultPagePaginationState: PaginationParams = {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
};

export function usePagePagination<RequestData>(
    apiRequest: (
        searchParams: URLSearchParams,
        signal: AbortSignal,
    ) => Promise<PagePaginationResponse<RequestData>>,
    setItems: Dispatch<SetStateAction<RequestData[]>>,
    searchParams: string,
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

                const page = await apiRequest(new URLSearchParams(searchParams), controller.signal);

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
    }, [searchParams, apiRequest, setItems, enabled, reloadKey]);

    function refetchPage() {
        setReloadKey((prevKey) => prevKey + 1);
    }

    return { pagination, isLoading, refetchPage };
}
