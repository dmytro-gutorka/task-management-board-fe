import { Loader2, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GENERAL_ROUTES } from '../constants/routes/general.routes.ts';
import { Button } from './shadcn/ui/button.tsx';
import { useAuth } from '../providers/auth-provider/auth.provider.tsx';

export function LogoutButton() {
    const { t } = useTranslation(['auth']);
    const { isLogoutLoading, logout, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        void navigate(GENERAL_ROUTES.LOGIN_PAGE, { replace: true });
    }

    if (!isAuthenticated) return null;

    return (
        <Button variant="outline" onClick={() => void handleLogout()} disabled={isLogoutLoading}>
            {isLogoutLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <LogOut className="mr-2 h-4 w-4" />
            )}
            {t('common.buttons.logout', { ns: 'auth' })}
        </Button>
    );
}
