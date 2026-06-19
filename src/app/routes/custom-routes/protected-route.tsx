import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useProfileCompletionReminder } from '../../../shared/modules/profile-toast-reminder/model/hooks/useProfileCompletionReminder.tsx';
import { GENERAL_ROUTES } from '../../../shared/constants/routes/general.routes.ts';
import { useAuth } from '../../../shared/providers/auth-provider/auth.provider.tsx';

export function ProtectedRoute() {
    const location = useLocation();
    const { isAuthenticated, isUserLoading } = useAuth();

    if (isUserLoading) return null;

    if (!isAuthenticated)
        return <Navigate to={GENERAL_ROUTES.LOGIN_PAGE} state={{ from: location }} replace />;

    return <ProtectedContent />;
}

function ProtectedContent() {
    useProfileCompletionReminder();

    return <Outlet />;
}
