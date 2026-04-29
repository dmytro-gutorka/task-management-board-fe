import { ActionModal } from '@/shared/components/modal/ui/action-modal.tsx';
import { Button } from '@/shared/components/shadcn/ui/button.tsx';
import { IconTooltip } from '@/shared/components/icon-tooltip.tsx';
import { Separator } from '@/shared/components/shadcn/ui/separator.tsx';
import { useModalState } from '@/shared/components/modal/model/hooks/useStateModal.ts';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../app/routes/routes.constants.ts';
import type { TaskFormValues } from '../../model/task-form/tasks-form.types.ts';
import { createTask } from '../../model/task/task.api.ts';
import { TaskForm } from '../task-forms/task-form.tsx';

export function CreateTaskModal() {
    const { openModal, closeModal, setOpen, open } = useModalState();

    const navigate = useNavigate();

    function handleSubmit(values: TaskFormValues) {
        createTask(values);
        closeModal();

        void navigate(ROUTES.TASKS_PAGE);
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
                submitFormId="task-form"
            >
                <Separator />

                <TaskForm mode="create" submitLabel="Create task" onSubmit={handleSubmit} />
            </ActionModal>
        </>
    );
}
