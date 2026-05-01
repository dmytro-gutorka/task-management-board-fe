import { Loader2, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/shadcn/ui/button.tsx';
import { useLogout } from '../model/hooks/useLogout.ts';

export function LogoutButton() {
    const { t } = useTranslation(['auth']);

    const { isAuthenticated, isSubmitting, handleLogout } = useLogout();

    if (!isAuthenticated) return null;

    return (
        <Button variant="outline" onClick={() => void handleLogout()} disabled={isSubmitting}>
            {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <LogOut className="mr-2 h-4 w-4" />
            )}
            {t('common.buttons.logout', { ns: 'auth' })}
        </Button>
    );
}
