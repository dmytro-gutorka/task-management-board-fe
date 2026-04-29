import type { ReactNode } from 'react';
import { Button } from '@/shared/components/shadcn/ui/button';
import { BaseModal } from './base-modal';
import { type IBaseModal } from '@/shared/components/modal/model/modal.types';

interface ActionModalProps extends IBaseModal {
    children: ReactNode;
    submitLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
    submitFormId?: string;
}

export function ActionModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    isLoading = false,
    submitFormId,
}: ActionModalProps) {
    return (
        <BaseModal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            contentClassName="sm:max-w-lg"
        >
            <div className="space-y-4">{children}</div>

            <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                    {cancelLabel}
                </Button>

                <Button variant="default" form={submitFormId} disabled={isLoading}>
                    {submitLabel}
                </Button>
            </div>
        </BaseModal>
    );
}
