import { mapTaskTiInitialValues } from '../helpers/mapTaskTiInitialValues.ts';
import { ActionModal } from '../../../../components/modal/ui/action-modal.tsx';
import { Separator } from '../../../../components/shadcn/ui/separator.tsx';
import { TaskForm } from '../../task-form/task-form.tsx';
import { useTranslation } from 'react-i18next';
import type { Task } from '../model/task.types.ts';
import type { TaskFormValues } from '../../task-form/model/tasks-form.types.ts';

interface EditTaskModalProps {
    initialValues: Task;
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (values: TaskFormValues) => void;
}

export function EditTaskModal({ initialValues, isOpen, setOpen, onSubmit }: EditTaskModalProps) {
    const { t } = useTranslation(['common', 'tasks']);
    const formInitialValues = mapTaskTiInitialValues(initialValues);
    const formId = 'edit-task-form';

    return (
        <>
            <ActionModal
                open={isOpen}
                onOpenChange={setOpen}
                title={t('editTask', { ns: 'tasks' })}
                description={t('fillFields', { ns: 'tasks' })}
                submitLabel={t('edit', { ns: 'tasks' })}
                submitFormId={formId}
            >
                <Separator />

                <TaskForm formId={formId} initialValues={formInitialValues} onSubmit={onSubmit} />
            </ActionModal>
        </>
    );
}
