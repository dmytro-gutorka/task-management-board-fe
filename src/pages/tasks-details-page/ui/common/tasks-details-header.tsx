import { useTranslation } from 'react-i18next';
import { Button } from '../../../../shared/components/shadcn/ui/button.tsx';
import { ArrowLeft, Pencil } from 'lucide-react';

interface TasksDetailsHeaderProps {
    openModal: () => void;
    onClick: () => void;
}

export function TasksDetailsHeader({ onClick, openModal }: TasksDetailsHeaderProps) {
    const { t } = useTranslation(['common']);

    return (
        <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={onClick}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backToTasks', { ns: 'common' })}
            </Button>

            <Button variant="outline" size="sm" className="gap-2" onClick={openModal}>
                <Pencil className="h-4 w-4" />
                {t('edit', { ns: 'common' })}
            </Button>
        </div>
    );
}
