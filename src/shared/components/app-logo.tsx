import { NotebookText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TASKS_ROUTES } from '../constants/routes/tasks.routes.ts';

export function AppLogo() {
    const { t } = useTranslation(['tasks']);

    return (
        <Link to={TASKS_ROUTES.TASKS_PAGE}>
            <div className="flex items-center space-x-2">
                <NotebookText className="h-6 w-6" />
                <h2 className="text-1xl font-semibold">{t('title', { ns: 'tasks' })}</h2>
            </div>
        </Link>
    );
}
