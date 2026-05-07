import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PageLoaderOverlay } from '../../../shared/components/PageLoaderOverlay.tsx';
import { ROUTES } from '../../../shared/constants/routes.constants.ts';
import { useModalState } from '../../../shared/components/modal/model/hooks/useStateModal.ts';
import { useGetTaskById } from '../../../shared/modules/tasks/common/model/api/hooks/useGetTaskById.ts';
import { EditTaskModal } from '../../../shared/modules/tasks/common/ui/edit-task-modal.tsx';
import { useUpdateTask } from '../../../shared/modules/tasks/common/model/api/hooks/useUpdateTask.ts';
import { TasksDetailsCard } from './common/tasks-details-card.tsx';
import { TasksDetailsHeader } from './common/tasks-details-header.tsx';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';

export function TasksDetailsPage() {
    const { taskId = '' } = useParams<{ taskId: string }>();

    const { openModal, setOpen, open, closeModal } = useModalState();
    const { updateTask, isLoading: isTaskUpdating } = useUpdateTask();
    const { isTaskLoading, task, setTask } = useGetTaskById(taskId);

    const navigate = useNavigate();

    async function handleEditTask(values: TaskFormValues) {
        if (!taskId) return;

        const updatedTask = await updateTask(values, taskId);

        if (!updatedTask) return;

        setTask(updatedTask);
        closeModal();
    }

    function handleBackToTasks() {
        void navigate(ROUTES.TASKS_PAGE);
    }

    if (!taskId) return <Navigate to={ROUTES.TASKS_PAGE} replace />;

    const shouldShowLoader = isTaskLoading && !task;
    const shouldShowEmptyState = !isTaskLoading && !task;
    const shouldShowTask = !isTaskLoading && task;

    return (
        <main className="min-h-svh bg-background">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <TasksDetailsHeader onClick={handleBackToTasks} openModal={openModal} />
                {shouldShowEmptyState && <div>No available task</div>}
                {shouldShowLoader && <PageLoaderOverlay />}
                {shouldShowTask && <TasksDetailsCard task={task} />}
            </div>
            {shouldShowTask && (
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
