import { UserApiService } from '../../../shared/modules/users/api/user-api.service.ts';
import { toast } from 'sonner';
import { handleError } from '../../../shared/infrastructure/errors/handle-error.ts';
import { useState, useCallback, useEffect } from 'react';
import type { User } from '../../../shared/modules/users/api/user-api.types-domain.ts';
import type { RoleWithPermissions } from '../../../shared/modules/rbac/rbac-api.types.ts';
import type { PermissionRoles } from '../../../shared/modules/permissions/model/permissions.types.ts';
import { RbacApiService } from '../../../shared/modules/rbac/rbac-api.service.ts';
import { useParams } from 'react-router-dom';

export function useOrchestrateAdminUserDetailsPage() {
    const { userId } = useParams();

    const [isSaving, setIsSaving] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<RoleWithPermissions[]>();
    const [selectedRoles, setSelectedRoles] = useState<PermissionRoles[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function saveRoles() {
        if (!userId) return;

        try {
            setIsSaving(true);

            const updatedUser = await UserApiService.updateUserRoles(userId, selectedRoles);

            setUser(updatedUser);
            setSelectedRoles(updatedUser.roles);
            toast.success('User roles updated');
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setIsSaving(false);
        }
    }

    const fetchData = useCallback(
        async (signal?: AbortSignal) => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const [userResult, rolesResult] = await Promise.all([
                    UserApiService.getUserById(userId, signal),
                    RbacApiService.getRoles(signal),
                ]);

                setUser(userResult);
                setSelectedRoles(userResult.roles);
                setRoles(rolesResult);
            } catch (error: unknown) {
                if (!signal?.aborted) {
                    handleError(error);
                    setUser(null);
                    setRoles([]);
                    setSelectedRoles([]);
                }
            } finally {
                if (!signal?.aborted) {
                    setIsLoading(false);
                }
            }
        },
        [userId],
    );

    useEffect(() => {
        const controller = new AbortController();

        void fetchData(controller.signal);

        return () => controller.abort();
    }, [fetchData]);

    return {
        setSelectedRoles,
        selectedRoles,
        user,
        isLoading,
        saveRoles,
        roles,
        isSaving,
    };
}
