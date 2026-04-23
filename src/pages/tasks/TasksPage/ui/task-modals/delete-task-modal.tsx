import { logger } from '@/shared/lib/logger';
import { ConfirmationModal } from '@/shared/components/modal/ui/confirmation-modal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function DeleteTaskModal() {
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={() => {
                    setDeleteOpen(true);
                }}
            >
                <Trash2 className="h-4 w-4" />
                Delete
            </Button>

            <ConfirmationModal
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Delete task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                confirmLabel="Delete"
                confirmVariant="destructive"
                onConfirm={() => {
                    logger.log('TODO: delete task');
                    setDeleteOpen(false);
                }}
            />
        </>
    );
}
