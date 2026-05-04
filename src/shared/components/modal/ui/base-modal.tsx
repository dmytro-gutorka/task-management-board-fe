import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/shadcn/ui/dialog';
import { type IBaseModal } from '@/shared/components/modal/model/modal.types';
import type { ReactNode } from 'react';
import { cn } from '../../../helpers/shadcn.utils.ts';

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
            <DialogContent
                className={cn('sm:max-w-lg max-h-[90vh] flex flex-col', contentClassName)}
            >
                <DialogHeader className="shrink-0">
                    {title ? <DialogTitle>{title}</DialogTitle> : null}
                    {description ? <DialogDescription>{description}</DialogDescription> : null}
                </DialogHeader>

                <div className="overflow-y-auto pr-1">{children}</div>
            </DialogContent>
        </Dialog>
    );
}
