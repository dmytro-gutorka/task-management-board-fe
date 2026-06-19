import { useAuth } from '../../../../providers/auth-provider/auth.provider.tsx';
import { usePermissions } from './usePermissions.ts';

export function useCurrentPermissions() {
    const { user } = useAuth();

    return usePermissions(user?.permissions);
}
