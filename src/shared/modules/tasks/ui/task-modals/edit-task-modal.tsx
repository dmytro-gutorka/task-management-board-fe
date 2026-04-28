import { logger } from '@/shared/lib/logger.ts';
import { Button } from '@/shared/components/shadcn/ui/button.tsx';
import { Pencil } from 'lucide-react';
import { ActionModal } from '@/shared/components/modal/ui/action-modal.tsx';
import { EditTaskForm } from '@/shared/modules/tasks/ui/task-forms/edit-task-form.tsx';
import { taskFormDefaultValues } from '@/shared/modules/tasks/model/task-form/tasks-form.data.ts';
import { Separator } from '@/shared/components/shadcn/ui/separator.tsx';
import { useModalState } from '@/shared/components/modal/model/hooks/useStateModal.ts';

export function EditTaskModal() {
    const { openModal, setOpen, open } = useModalState();

    function handleSubmit() {
        logger.log('edit task form');
    }

    return (
        <>
            <Button variant="outline" size="sm" className="gap-2" onClick={openModal}>
                <Pencil className="h-4 w-4" />
                Edit
            </Button>

            <ActionModal
                open={open}
                onOpenChange={setOpen}
                title="Edit task"
                description="Fill in the fields below."
                submitLabel="Edit"
                onSubmit={handleSubmit}
            >
                <Separator />
                <EditTaskForm initialValues={taskFormDefaultValues} onSubmit={handleSubmit} />
            </ActionModal>
        </>
    );
}
