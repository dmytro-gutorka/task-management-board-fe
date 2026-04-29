import { ActionModal } from '@/shared/components/modal/ui/action-modal.tsx';
import { Separator } from '@/shared/components/shadcn/ui/separator.tsx';
import { mapTaskTiInitialValues } from '../../helpers/mapTaskTiInitialValues.ts';
import type { TaskFormValues } from '../../model/task-form/tasks-form.types.ts';
import type { Task } from '../../model/task/task.types.ts';

import { TaskForm } from '../task-forms/task-form.tsx';

interface EditTaskModalProps {
    initialValues: Task;
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (values: TaskFormValues) => void;
}

export function EditTaskModal({ initialValues, isOpen, setOpen, onSubmit }: EditTaskModalProps) {
    const formInitialValues = mapTaskTiInitialValues(initialValues);
    const formId = 'edit-task-form';

    return (
        <>
            <ActionModal
                open={isOpen}
                onOpenChange={setOpen}
                title="Edit task"
                description="Fill in the fields below."
                submitLabel="Edit"
                submitFormId={formId}
            >
                <Separator />

                <TaskForm formId={formId} initialValues={formInitialValues} onSubmit={onSubmit} />
            </ActionModal>
        </>
    );
}
