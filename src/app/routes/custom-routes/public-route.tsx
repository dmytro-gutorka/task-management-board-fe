import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../../shared/infrastructure/auth/auth.token-helpers.ts';
import { GENERAL_ROUTES } from '../../../shared/constants/routes/general.routes.ts';

export function PublicOnlyRoute() {
    if (isAuthenticated()) return <Navigate to={GENERAL_ROUTES.HOME} replace />;

    return <Outlet />;
}
