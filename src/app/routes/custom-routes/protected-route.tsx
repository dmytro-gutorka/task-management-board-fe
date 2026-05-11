import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../../shared/infrastructure/auth/auth.token-helpers.ts';
import { useProfileCompletionReminder } from '../../../shared/modules/profile-toast-reminder/model/hooks/useProfileCompletionReminder.tsx';
import { GENERAL_ROUTES } from '../../../shared/constants/routes/general.routes.ts';

export function ProtectedRoute() {
    const location = useLocation();

    if (!isAuthenticated())
        return <Navigate to={GENERAL_ROUTES.LOGIN_PAGE} state={{ from: location }} replace />;

    return <ProtectedContent />;
}

function ProtectedContent() {
    useProfileCompletionReminder();

    return <Outlet />;
}
