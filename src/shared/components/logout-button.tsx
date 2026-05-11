import { Loader2, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './shadcn/ui/button.tsx';

interface LogoutButtonProps {
    isLogoutLoading: boolean;
    handleLogout: () => Promise<void>;
}

export function LogoutButton({ isLogoutLoading, handleLogout }: LogoutButtonProps) {
    const { t } = useTranslation(['auth']);

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
