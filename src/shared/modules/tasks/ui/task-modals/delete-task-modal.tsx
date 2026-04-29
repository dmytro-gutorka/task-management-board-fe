import { ConfirmationModal } from '@/shared/components/modal/ui/confirmation-modal.tsx';

interface DeleteTaskModalProps {
    setOpen: (open: boolean) => void;
    onDelete: () => void;
    isOpen: boolean;
}

export function DeleteTaskModal({ isOpen, onDelete, setOpen }: DeleteTaskModalProps) {
    return (
        <>
            <ConfirmationModal
                open={isOpen}
                onOpenChange={setOpen}
                title="Delete task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                confirmLabel="Delete"
                confirmVariant="destructive"
                onConfirm={onDelete}
            />
        </>
    );
}
