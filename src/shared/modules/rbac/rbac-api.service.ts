import type { PermissionResponse, RoleWithPermissions } from './rbac-api.types.ts';
import { httpClient } from '../../infrastructure/axios/httpClient.ts';
import { RBAC_ROUTES } from './rbac-api.constants.ts';

export const RbacApiService = {
    async getRoles(signal?: AbortSignal): Promise<RoleWithPermissions[]> {
        const { data } = await httpClient.get<RoleWithPermissions[]>(RBAC_ROUTES.ROLES, { signal });

        return data;
    },

    async getPermissions(signal?: AbortSignal): Promise<PermissionResponse[]> {
        const { data } = await httpClient.get<PermissionResponse[]>(RBAC_ROUTES.PERMISSIONS, {
            signal,
        });

        return data;
    },
};
