import { useTranslation } from 'react-i18next';
import { ConfirmationModal } from '../../../../shared/components/modal/ui/confirmation-modal.tsx';

interface DeleteTaskModalProps {
    setOpen: (open: boolean) => void;
    onDelete: () => void;
    isOpen: boolean;
}

export function DeleteTaskModal({ isOpen, onDelete, setOpen }: DeleteTaskModalProps) {
    const { t } = useTranslation(['common', 'tasks']);

    return (
        <>
            <ConfirmationModal
                open={isOpen}
                onOpenChange={setOpen}
                title={t('deleteTask', { ns: 'tasks' })}
                description={t('deleteConfirmation', { ns: 'tasks' })}
                confirmLabel={t('delete', { ns: 'common' })}
                confirmVariant="destructive"
                cancelLabel={t('cancel', { ns: 'common' })}
                onConfirm={onDelete}
            />
        </>
    );
}
