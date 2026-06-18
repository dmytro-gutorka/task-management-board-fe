import { useCurrentPermissions } from '../../../shared/modules/permissions/model/hooks/useCurrentPermissions.ts';
import { Navigate, Outlet } from 'react-router-dom';
import { PermissionModes } from '../../../shared/modules/permissions/model/permissions.constants.ts';
import type {
    PermissionMode,
    PermissionCheckInput,
} from '../../../shared/modules/permissions/model/permissions.types.ts';
import { TASKS_ROUTES } from '../../../shared/constants/routes/tasks.routes.ts';

interface PermissionRouteProps {
    permission: PermissionCheckInput;
    mode?: PermissionMode;
}

export function PermissionRoute({ permission, mode = PermissionModes.ALL }: PermissionRouteProps) {
    const { sufficientPermissions } = useCurrentPermissions();

    if (!sufficientPermissions(permission, mode)) {
        return <Navigate to={TASKS_ROUTES.TASKS_PAGE} replace />;
    }

    return <Outlet />;
}
