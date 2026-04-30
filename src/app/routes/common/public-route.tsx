import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../../shared/modules/auth/auth-token.helpers.ts';

export function PublicOnlyRoute() {
    if (isAuthenticated()) {
        return <Navigate to="/tasks" replace />;
    }

    return <Outlet />;
}
