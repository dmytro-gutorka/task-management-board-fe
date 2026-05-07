import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../../shared/infrastructure/auth/auth.token-helpers.ts';
import { ROUTES } from '../../../shared/constants/routes.constants.ts';

export function PublicOnlyRoute() {
    if (isAuthenticated()) return <Navigate to={ROUTES.HOME} replace />;

    return <Outlet />;
}
