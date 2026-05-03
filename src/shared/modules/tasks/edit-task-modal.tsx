import { useTranslation } from 'react-i18next';
<<<<<<<< HEAD:src/shared/modules/tasks/task-modals/ui/edit-task-modal.tsx
import { ActionModal } from '../../../../components/modal/ui/action-modal.tsx';
import { Separator } from '../../../../components/shadcn/ui/separator.tsx';
import { mapTaskTiInitialValues } from '../../common/helpers/mapTaskTiInitialValues.ts';
import type { TaskFormValues } from '../../task-forms/model/tasks-form.types.ts';
import type { Task } from '../../common/model/task.types.ts';

import { TaskForm } from '../../task-forms/task-form.tsx';
========
import { ActionModal } from '../../../components/modal/ui/action-modal.tsx';
import { Separator } from '../../../components/shadcn/ui/separator.tsx';
import { mapTaskTiInitialValues } from '../helpers/mapTaskTiInitialValues.ts';
import type { TaskFormValues } from '../model/task-form/tasks-form.types.ts';
import type { Task } from '../model/task/task.types.ts';

import { TaskForm } from './task-form.tsx';
>>>>>>>> feature/logout:src/shared/modules/tasks/edit-task-modal.tsx

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
