import { logger } from '@/shared/lib/logger.ts';
import { ConfirmationModal } from '@/shared/components/modal/ui/confirmation-modal.tsx';
import { Button } from '@/shared/components/shadcn/ui/button.tsx';
import { Trash2 } from 'lucide-react';
import { useModalState } from '@/shared/components/modal/model/hooks/useStateModal.ts';

export function DeleteTaskModal() {
    const { openModal, closeModal, setOpen, open } = useModalState();

    return (
        <>
            <Button variant="destructive" size="sm" className="gap-2" onClick={openModal}>
                <Trash2 className="h-4 w-4" />
                Delete
            </Button>

            <ConfirmationModal
                open={open}
                onOpenChange={setOpen}
                title="Delete task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                confirmLabel="Delete"
                confirmVariant="destructive"
                onConfirm={() => {
                    logger.log('TODO: delete task');
                    closeModal();
                }}
            />
        </>
    );
}
