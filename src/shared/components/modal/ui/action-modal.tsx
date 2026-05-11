import type { ReactNode } from 'react';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Loader } from '../../loader.tsx';
import { BaseModal } from '../base-modal.tsx';
import { type IBaseModal } from '@/shared/components/modal/model/modal.types';

interface ActionModalProps extends IBaseModal {
    children: ReactNode;
    isLoading?: boolean;
    submitFormId?: string;
    isSubmitDisabled?: boolean;
    isCancelDisabled?: boolean;
    submitLabel?: string | ReactNode;
    cancelLabel?: string | ReactNode;
    onSubmit?: () => unknown;
    onCancel?: () => void;
}

export function ActionModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    submitFormId,
    isLoading = false,
    isSubmitDisabled = false,
    isCancelDisabled = false,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    onSubmit,
    onCancel,
}: ActionModalProps) {
    function handleCancel() {
        onCancel?.();
        onOpenChange(false);
    }

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
                <Button variant="outline" onClick={handleCancel} disabled={isCancelDisabled}>
                    {cancelLabel}
                </Button>

                <Button
                    variant="default"
                    form={submitFormId}
                    disabled={isSubmitDisabled}
                    onClick={() => onSubmit?.()}
                >
                    {isLoading && <Loader />}
                    {submitLabel}
                </Button>
            </div>
        </BaseModal>
    );
}
