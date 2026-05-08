import { Separator } from '@/shared/components/shadcn/ui/separator';
import { TooltipProvider } from '@/shared/components/shadcn/ui/tooltip';
import { NotebookText } from 'lucide-react';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { Link } from 'react-router-dom';
import { PROFILE_ROUTES } from '../constants/routes/profile.routes.ts';
import { TASKS_ROUTES } from '../constants/routes/tasks.routes.ts';
import { LogoutButton } from './logout-button.tsx';
import { LanguageSwitcher } from './language-switcher.tsx';
import { useTranslation } from 'react-i18next';
import { Button } from './shadcn/ui/button.tsx';
import { CircleUser } from 'lucide-react';

export function Header() {
    const { t } = useTranslation(['common', 'tasks']);

    return (
        <>
            <TooltipProvider delayDuration={150}>
                <div className="flex justify-between p-4">
                    <Link to={TASKS_ROUTES.TASKS_PAGE}>
                        <div className="flex items-center space-x-2">
                            <NotebookText className="h-6 w-6" />
                            <h2 className="text-1xl font-semibold">
                                {t('title', { ns: 'tasks' })}
                            </h2>
                        </div>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <LogoutButton />
                        <Link to={PROFILE_ROUTES.PROFILE_PAGE}>
                            <Button variant="outline">
                                <CircleUser />
                            </Button>
                        </Link>
                    </div>
                </div>
                <Separator />
            </TooltipProvider>
        </>
    );
}
