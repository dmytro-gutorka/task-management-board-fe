import { useState, useCallback, useEffect } from 'react';
import type { RoleWithPermissions } from '../../../../../../shared/modules/rbac/rbac-api.types.ts';
import { RbacApiService } from '../../../../../../shared/modules/rbac/rbac-api.service.ts';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';

export function useGetRoles() {
    const [roles, setRoles] = useState<RoleWithPermissions[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRoles = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true);

        try {
            const result = await RbacApiService.getRoles(signal);

            setRoles(result);
        } catch (error: unknown) {
            if (!signal?.aborted) {
                handleError(error);
                setRoles([]);
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        void fetchRoles(controller.signal);

        return () => controller.abort();
    }, [fetchRoles]);

    return { roles, isLoading };
}
