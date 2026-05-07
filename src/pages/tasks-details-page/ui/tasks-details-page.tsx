import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageLoaderOverlay } from '../../../shared/components/PageLoaderOverlay.tsx';
import { ROUTES } from '../../../shared/constants/routes.constants.ts';
import { useModalState } from '../../../shared/components/modal/model/hooks/useStateModal.ts';
import { useGetTaskById } from '../../../shared/modules/tasks/common/model/api/hooks/useGetTaskById.ts';
import { EditTaskModal } from '../../../shared/modules/tasks/common/ui/edit-task-modal.tsx';
import { useUpdateTasks } from '../../../shared/modules/tasks/common/model/api/hooks/useUpdateTasks.ts';
import { TasksDetailsCard } from './common/tasks-details-card.tsx';
import { TasksDetailsHeader } from './common/tasks-details-header.tsx';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';

export function TasksDetailsPage() {
    const { taskId = '' } = useParams<{ taskId: string }>();

    const { openModal, setOpen, open, closeModal } = useModalState();
    const { updateTask, isLoading: isTaskUpdating } = useUpdateTasks();
    const { getTaskById, isLoading, task, setTask } = useGetTaskById();

    const navigate = useNavigate();

    useEffect(() => {
        if (!taskId) return;

        async function fetchTask() {
            const task = await getTaskById(taskId);

            setTask(task);
        }

        void fetchTask();
    }, [getTaskById, setTask, taskId]);

    function handleBackToTasks() {
        void navigate(ROUTES.TASKS_PAGE);
    }

    async function handleEditTask(values: TaskFormValues) {
        const updatedTask = await updateTask(values, taskId);

        if (!updatedTask) return;

        setTask(updatedTask);
        closeModal();
    }

    return (
        <main className="min-h-svh bg-background">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <TasksDetailsHeader onClick={handleBackToTasks} openModal={openModal} />
                {!task && !isLoading && <div>No available task</div>}
                {!task && isLoading && <PageLoaderOverlay />}
                {task && !isLoading && <TasksDetailsCard task={task} />}
            </div>
            {task && !isLoading && (
                <EditTaskModal
                    initialValues={task}
                    onSubmit={handleEditTask}
                    isOpen={open}
                    setOpen={setOpen}
                    isTaskUpdating={isTaskUpdating}
                />
            )}
        </main>
    );
}
