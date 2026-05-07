import { useTranslation } from 'react-i18next';
import { ActionModal } from '../../../../shared/components/modal/ui/action-modal.tsx';
import { Separator } from '../../../../shared/components/shadcn/ui/separator.tsx';
import { TaskForm } from '../../../../shared/modules/tasks/task-form/task-form.tsx';
import type { TaskFormValues } from '../../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';

interface CreateTaskModalProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (values: TaskFormValues) => Promise<void>;
    isTaskCreating: boolean;
}

export function CreateTaskModal({
    isOpen,
    setOpen,
    onSubmit,
    isTaskCreating,
}: CreateTaskModalProps) {
    const { t } = useTranslation(['common', 'tasks']);
    const formId = 'create-task-form';

    return (
        <>
            <ActionModal
                open={isOpen}
                onOpenChange={setOpen}
                isLoading={isTaskCreating}
                title={t('createTask', { ns: 'tasks' })}
                description={t('fillFields', { ns: 'tasks' })}
                submitLabel={t('create', { ns: 'common' })}
                submitFormId={formId}
                cancelLabel={t('cancel', { ns: 'common' })}
            >
                <Separator />

                <TaskForm onSubmit={onSubmit} formId={formId} />
            </ActionModal>
        </>
    );
}
