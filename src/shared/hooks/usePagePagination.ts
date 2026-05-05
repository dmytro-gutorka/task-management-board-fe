import axios from 'axios';
import { useEffect, useState } from 'react';
import { handleError } from '../infrastructure/errors/handle-error.ts';
import type { PagePaginationResponse } from '../types/common.ts';

const defaultPagePaginationState = {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
};

export function usePagePagination<RequestData>(
    queryString: string,
    reloadKey: number,
    apiRequest: (
        queryString: string,
        signal: AbortSignal,
    ) => Promise<PagePaginationResponse<RequestData>>,
) {
    const [items, setItems] = useState<RequestData[]>([]);
    const [pagination, setPagination] = useState(defaultPagePaginationState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function loadPage() {
            try {
                setIsLoading(true);

                const page = await apiRequest(queryString, controller.signal);

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
    }, [queryString, reloadKey, apiRequest]);

    return {
        tasks: items,
        pagination,
        isLoading,
    };
}
