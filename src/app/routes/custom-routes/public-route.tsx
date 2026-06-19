import { Navigate, Outlet } from 'react-router-dom';
import { GENERAL_ROUTES } from '../../../shared/constants/routes/general.routes.ts';
import { useAuth } from '../../../shared/providers/auth-provider/auth.provider.tsx';

export function PublicOnlyRoute() {
    const { isAuthenticated, isUserLoading } = useAuth();

    if (isUserLoading) return null;

    if (isAuthenticated) return <Navigate to={GENERAL_ROUTES.HOME} replace />;

    return <Outlet />;
}
