import { DEFAULT_ADMIN_USERS_PAGE, DEFAULT__ADMIN_USERS_LIMIT } from '../admin-users.constants.ts';
import type { PagePaginationResponse } from '../../../../../../shared/types/common.ts';
import { useState, useCallback, useEffect } from 'react';
import type { UserListItem } from '../../../../../../shared/modules/users/api/user-api.types-domain.ts';
import { useDebounce } from '../../../../../../shared/hooks/useDebounce.ts';
import { UserApiService } from '../../../../../../shared/modules/users/api/user-api.service.ts';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';

export function useGetUsers() {
    const [usersPage, setUsersPage] = useState<PagePaginationResponse<UserListItem> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(DEFAULT_ADMIN_USERS_PAGE);

    const debouncedSearch = useDebounce(search, 350);

    const fetchUsers = useCallback(
        async (signal?: AbortSignal) => {
            setIsLoading(true);

            try {
                const result = await UserApiService.getUsers(
                    {
                        page,
                        limit: DEFAULT__ADMIN_USERS_LIMIT,
                        search: debouncedSearch.trim() || undefined,
                    },
                    signal,
                );

                setUsersPage(result);
            } catch (error: unknown) {
                if (!signal?.aborted) {
                    handleError(error);
                    setUsersPage(null);
                }
            } finally {
                if (!signal?.aborted) {
                    setIsLoading(false);
                }
            }
        },
        [debouncedSearch, page],
    );

    useEffect(() => {
        const controller = new AbortController();

        void fetchUsers(controller.signal);

        return () => controller.abort();
    }, [fetchUsers]);

    useEffect(() => {
        setPage(DEFAULT_ADMIN_USERS_PAGE);
    }, [debouncedSearch]);

    return { setSearch, usersPage, isLoading, search, page, setPage };
}
