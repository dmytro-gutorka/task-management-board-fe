import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../../shared/modules/auth/auth-token.helpers.ts';
import { ROUTES } from './routes.constants.ts';

export function PublicOnlyRoute() {
    if (isAuthenticated()) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
}
