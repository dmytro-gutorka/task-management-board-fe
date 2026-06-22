import { useCurrentPermissions } from '../../../shared/modules/permissions/model/hooks/useCurrentPermissions.ts';
import { Navigate, Outlet } from 'react-router-dom';
import { PermissionModes } from '../../../shared/modules/permissions/model/permissions.constants.ts';
import type {
    PermissionMode,
    PermissionCheckInput,
} from '../../../shared/modules/permissions/model/permissions.types.ts';
import { TASKS_ROUTES } from '../../../shared/constants/routes/tasks.routes.ts';
import { GENERAL_ROUTES } from '../../../shared/constants/routes/general.routes.ts';
import { useAuth } from '../../../shared/providers/auth-provider/auth.provider.tsx';
import { PageLoader } from '../../../shared/components/loader-page.tsx';

interface PermissionRouteProps {
    permission: PermissionCheckInput;
    mode?: PermissionMode;
}

export function PermissionRoute({ permission, mode = PermissionModes.ALL }: PermissionRouteProps) {
    const { user, isAuthenticated, isUserLoading } = useAuth();
    const { sufficientPermissions } = useCurrentPermissions();

    if (isUserLoading) {
        return <PageLoader />;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to={GENERAL_ROUTES.LOGIN_PAGE} replace />;
    }

    if (!sufficientPermissions(permission, mode)) {
        return <Navigate to={TASKS_ROUTES.TASKS_PAGE} replace />;
    }

    return <Outlet />;
}
