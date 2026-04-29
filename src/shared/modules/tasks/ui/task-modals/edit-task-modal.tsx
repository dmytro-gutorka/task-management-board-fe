import { Button } from '@/shared/components/shadcn/ui/button.tsx';
import { Pencil } from 'lucide-react';
import { ActionModal } from '@/shared/components/modal/ui/action-modal.tsx';
import { Separator } from '@/shared/components/shadcn/ui/separator.tsx';
import { useModalState } from '@/shared/components/modal/model/hooks/useStateModal.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../app/routes/routes.constants.ts';
import { mapTaskTiInitialValues } from '../../helpers/mapTaskTiInitialValues.ts';
import type { TaskFormValues } from '../../model/task-form/tasks-form.types.ts';
import { updateTask } from '../../model/task/task.api.ts';
import type { Task } from '../../model/task/task.types.ts';

import { TaskForm } from '../task-forms/task-form.tsx';

interface EditTaskModalProps {
    taskId: string;
    currentTask: Task;
}

export function EditTaskModal({ taskId, currentTask }: EditTaskModalProps) {
    const { openModal, setOpen, open, closeModal } = useModalState();

    const formInitialValues = mapTaskTiInitialValues(currentTask);

    const navigate = useNavigate();

    function handleSubmit(values: TaskFormValues) {
        updateTask(taskId, values);
        closeModal();

        void navigate(ROUTES.TASKS_PAGE);
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
                submitFormId="task-form"
            >
                <Separator />

                <TaskForm
                    mode="edit"
                    submitLabel="Save changes"
                    initialValues={formInitialValues}
                    onSubmit={handleSubmit}
                />
            </ActionModal>
        </>
    );
}
