import { AlertTriangle } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/ui/button';
import { useTranslation } from 'react-i18next';
import { BaseModal } from './base-modal';
import { type IBaseModal } from '@/shared/components/modal/model/modal.types';

interface ConfirmationModalProps extends IBaseModal {
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: 'default' | 'destructive';
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
}

export function ConfirmationModal({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmVariant = 'destructive',
    isLoading = false,
    onConfirm,
    onCancel,
}: ConfirmationModalProps) {
    function handleCancel() {
        onCancel?.();
        onOpenChange(false);
    }

    const { t } = useTranslation();

    return (
        <BaseModal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            contentClassName="sm:max-w-md"
        >
            <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <p className="text-sm text-muted-foreground">
                    {t('tasks.form.confirmationAction')}
                </p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                    {cancelLabel}
                </Button>

                <Button variant={confirmVariant} onClick={onConfirm} disabled={isLoading}>
                    {confirmLabel}
                </Button>
            </div>
        </BaseModal>
    );
}
