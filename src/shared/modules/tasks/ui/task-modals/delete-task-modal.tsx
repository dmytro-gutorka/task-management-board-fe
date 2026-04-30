import { useTranslation } from 'react-i18next';
import { ConfirmationModal } from '@/shared/components/modal/ui/confirmation-modal.tsx';

interface DeleteTaskModalProps {
    setOpen: (open: boolean) => void;
    onDelete: () => void;
    isOpen: boolean;
}

export function DeleteTaskModal({ isOpen, onDelete, setOpen }: DeleteTaskModalProps) {
    const { t } = useTranslation();

    return (
        <>
            <ConfirmationModal
                open={isOpen}
                onOpenChange={setOpen}
                title={t('tasks.deleteTask')}
                description={t('tasks.deleteConfirmation')}
                confirmLabel={t('common.delete')}
                confirmVariant="destructive"
                onConfirm={onDelete}
            />
        </>
    );
}
