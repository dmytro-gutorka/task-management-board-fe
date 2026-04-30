import { useTranslation } from 'react-i18next';
import { ActionModal } from '@/shared/components/modal/ui/action-modal.tsx';
import { Separator } from '@/shared/components/shadcn/ui/separator.tsx';
import type { TaskFormValues } from '../../model/task-form/tasks-form.types.ts';
import { TaskForm } from '../task-forms/task-form.tsx';

interface CreateTaskModalProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (values: TaskFormValues) => void;
}

export function CreateTaskModal({ isOpen, setOpen, onSubmit }: CreateTaskModalProps) {
    const { t } = useTranslation();
    const formId = 'create-task-form';

    return (
        <>
            <ActionModal
                open={isOpen}
                onOpenChange={setOpen}
                title={t('tasks.createTask')}
                description={t('tasks.fillFields')}
                submitLabel={t('common.create')}
                submitFormId={formId}
            >
                <Separator />

                <TaskForm onSubmit={onSubmit} formId={formId} />
            </ActionModal>
        </>
    );
}
