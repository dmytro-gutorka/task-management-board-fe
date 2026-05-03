import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../../shared/modules/auth/auth-token.helpers.ts';
import { useProfileCompletionReminder } from '../../../shared/modules/profile-toast-reminder/model/useProfileCompletionReminder.tsx';
import { ROUTES } from './routes.constants.ts';

export function ProtectedRoute() {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to={ROUTES.LOGIN_PAGE} replace state={{ from: location }} />;
    }

    return <ProtectedContent />;
}

function ProtectedContent() {
    useProfileCompletionReminder();

    return <Outlet />;
}
