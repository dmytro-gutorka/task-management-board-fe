import { Separator } from '@/shared/components/shadcn/ui/separator';
import { TooltipProvider } from '@/shared/components/shadcn/ui/tooltip';
import { NotebookText } from 'lucide-react';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { LogoutButton } from '../modules/auth/logout/ui/logout-button.tsx';
import { LanguageSwitcher } from './language-switcher.tsx';
import { useTranslation } from 'react-i18next';

export function Header() {
    const { t } = useTranslation(['common', 'tasks']);

    return (
        <>
            <TooltipProvider delayDuration={150}>
                <div className="flex justify-between p-4">
                    <div className="flex items-center space-x-2">
                        <NotebookText className="h-6 w-6" />
                        <h2 className="text-1xl font-semibold">{t('title', { ns: 'tasks' })}</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <LogoutButton />
                    </div>
                </div>
                <Separator />
            </TooltipProvider>
        </>
    );
}
