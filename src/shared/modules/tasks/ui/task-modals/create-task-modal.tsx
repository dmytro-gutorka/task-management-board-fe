import { ActionModal } from '@/shared/components/modal/ui/action-modal.tsx';
import { CreateTaskForm } from '@/shared/modules/tasks/ui/task-forms/create-task-form.tsx';
import { Button } from '@/shared/components/shadcn/ui/button.tsx';
import { IconTooltip } from '@/shared/components/icon-tooltip.tsx';
import { Separator } from '@/shared/components/shadcn/ui/separator.tsx';
import { useModalState } from '@/shared/components/modal/model/hooks/useStateModal.ts';
import { logger } from '@/shared/lib/logger.ts';
import { Plus } from 'lucide-react';

export function CreateTaskModal() {
    const { openModal, setOpen, open } = useModalState();

    function handleSubmit() {
        logger.log('create task form');
    }

    return (
        <>
            <IconTooltip content="Create task">
                <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    aria-label="Create task"
                    onClick={openModal}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </IconTooltip>

            <ActionModal
                open={open}
                onOpenChange={setOpen}
                title="Create task"
                description="Fill in the fields below."
                submitLabel="Create"
                onSubmit={handleSubmit}
            >
                <Separator />
                <CreateTaskForm onSubmit={handleSubmit} />
            </ActionModal>
        </>
    );
}
