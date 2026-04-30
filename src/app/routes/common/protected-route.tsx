import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../../shared/modules/auth/auth-token.helpers.ts';

export function ProtectedRoute() {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
