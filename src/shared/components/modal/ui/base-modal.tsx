import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { type IBaseModal } from '@/shared/components/modal/model/modal.types';
import type { ReactNode } from 'react';

interface BaseModalProps extends IBaseModal {
    contentClassName?: string;
    children?: ReactNode;
}

export function BaseModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    contentClassName,
}: BaseModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={contentClassName}>
                <DialogHeader>
                    {title ? <DialogTitle>{title}</DialogTitle> : null}
                    {description ? <DialogDescription>{description}</DialogDescription> : null}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
