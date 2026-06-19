import { Separator } from '@/shared/components/shadcn/ui/separator';
import { TooltipProvider } from '@/shared/components/shadcn/ui/tooltip';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { useNavigate } from 'react-router-dom';
import { GENERAL_ROUTES } from '../constants/routes/general.routes.ts';
import { useAuth } from '../providers/auth-provider/auth.provider.tsx';
import { AppLogo } from './app-logo.tsx';
import { LogoutButton } from './logout-button.tsx';
import { LanguageSwitcher } from './language-switcher.tsx';
import { UserProfileButton } from './user-profile-button.tsx';
import AdminDashboardLink from './shadcn/admin-dashboard-link.tsx';

export function Header() {
    const { isLogoutLoading, logout, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    async function handleLogout() {
        await logout();

        void navigate(GENERAL_ROUTES.LOGIN_PAGE, { replace: true });
    }

    return (
        <>
            <TooltipProvider delayDuration={150}>
                <div className="flex justify-between p-4">
                    <AppLogo />
                    <div className="flex items-center space-x-2 gap-8">
                        <div className="flex items-center space-x-2">
                            <ThemeToggle />
                            <LanguageSwitcher />
                            {isAuthenticated && <UserProfileButton />}
                        </div>
                        {isAuthenticated && (
                            <LogoutButton
                                isLogoutLoading={isLogoutLoading}
                                handleLogout={handleLogout}
                            />
                        )}
                    </div>
                </div>
                <AdminDashboardLink />
                <Separator />
            </TooltipProvider>
        </>
    );
}
