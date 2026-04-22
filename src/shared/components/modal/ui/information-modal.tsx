import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { BaseModal } from './base-modal';
import { type IBaseModal } from '@/shared/components/modal/model/modal.types';

interface InformationModalProps extends IBaseModal {
    children?: ReactNode;
    closeLabel?: string;
}

export function InformationModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    closeLabel = 'Close',
}: InformationModalProps) {
    return (
        <BaseModal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            contentClassName="sm:max-w-lg"
        >
            <div className="text-sm text-muted-foreground">{children}</div>

            <div className="mt-6 flex justify-end">
                <Button onClick={() => onOpenChange(false)}>{closeLabel}</Button>
            </div>
        </BaseModal>
    );
}
