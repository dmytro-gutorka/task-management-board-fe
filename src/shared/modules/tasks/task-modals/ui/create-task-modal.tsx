import { useTranslation } from 'react-i18next';
import { ActionModal } from '../../../../components/modal/ui/action-modal.tsx';
import { Separator } from '../../../../components/shadcn/ui/separator.tsx';
import type { TaskFormValues } from '../../task-forms/model/tasks-form.types.ts';
import { TaskForm } from '../../task-forms/task-form.tsx';

interface CreateTaskModalProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (values: TaskFormValues) => void;
}

export function CreateTaskModal({ isOpen, setOpen, onSubmit }: CreateTaskModalProps) {
    const { t } = useTranslation(['common', 'tasks']);
    const formId = 'create-task-form';

    return (
        <>
            <ActionModal
                open={isOpen}
                onOpenChange={setOpen}
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
