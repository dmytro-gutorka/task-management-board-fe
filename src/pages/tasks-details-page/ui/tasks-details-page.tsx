import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes.constants.ts';
import { useModalState } from '../../../shared/components/modal/model/hooks/useStateModal.ts';
import { getTaskById, updateTask } from '../../../shared/modules/tasks/common/model/task.api.ts';
import type { Task } from '../../../shared/modules/tasks/common/model/task.types.ts';
import { EditTaskModal } from '../../../shared/modules/tasks/common/ui/edit-task-modal.tsx';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import type { Nullable } from '../../../shared/types/common.ts';
import { TasksDetailsCard } from './common/tasks-details-card.tsx';
import { TasksDetailsHeader } from './common/tasks-details-header.tsx';

export function TasksDetailsPage() {
    const { taskId = '' } = useParams<{ taskId: string }>();
    const { openModal, setOpen, open, closeModal } = useModalState();
    const navigate = useNavigate();

    const [task, setTask] = useState<Nullable<Task>>(getTaskById(taskId));

    if (!task) return null; // will be handled later, when backend will be ready

    function handleBackToTasks() {
        void navigate(ROUTES.TASKS_PAGE);
    }

    function handleSubmit(values: TaskFormValues) {
        const updatedTask = updateTask(taskId, values);
        setTask(updatedTask);

        closeModal();
    }

    return (
        <main className="min-h-svh bg-background">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <TasksDetailsHeader onClick={handleBackToTasks} openModal={openModal} />
                <TasksDetailsCard task={task} />
            </div>
            <EditTaskModal
                initialValues={task}
                onSubmit={handleSubmit}
                isOpen={open}
                setOpen={setOpen}
            />
        </main>
    );
}
