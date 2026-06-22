import { useState, useCallback, useEffect } from 'react';
import type { PermissionResponse } from '../../../../../shared/modules/rbac/rbac-api.types.ts';
import { RbacApiService } from '../../../../../shared/modules/rbac/rbac-api.service.ts';
import { handleError } from '../../../../../shared/infrastructure/errors/handle-error.ts';

export function useGetPermissions() {
    const [permissions, setPermissions] = useState<PermissionResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPermissions = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true);

        try {
            const result = await RbacApiService.getPermissions(signal);

            setPermissions(result);
        } catch (error: unknown) {
            if (!signal?.aborted) {
                handleError(error);
                setPermissions([]);
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        void fetchPermissions(controller.signal);

        return () => controller.abort();
    }, [fetchPermissions]);

    return { permissions, isLoading };
}
