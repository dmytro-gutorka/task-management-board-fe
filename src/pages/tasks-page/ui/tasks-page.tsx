import { useState } from 'react';
import { PageLoader } from '../../../shared/components/loader-page.tsx';
import { useModalState } from '../../../shared/components/modal/model/hooks/useStateModal.ts';
import { completeTask, getTaskById } from '../../../shared/modules/tasks/common/model/task.api.ts';
import type { Task } from '../../../shared/modules/tasks/common/model/task.types.ts';
import { EditTaskModal } from '../../../shared/modules/tasks/common/ui/edit-task-modal.tsx';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import { useCreateTasks } from '../model/common/api/hooks/useCreateTasks.ts';
import { useDeleteTask } from '../model/common/api/hooks/useDeleteTask.ts';
import { useGetAllTasks } from '../model/common/api/hooks/useGetAllTasks.ts';
import { useUpdateTasks } from '../model/common/api/hooks/useUpdateTasks.ts';
import { TASKS_VIEW_MODE } from '../model/common/tasks-page.constants.ts';
import { CreateTaskModal } from './task-modals/create-task-modal.tsx';
import { DeleteTaskModal } from './task-modals/delete-task-modal.tsx';
import type { Nullable } from '../../../shared/types/common.ts';
import { useTasksQueryState } from '../model/common/hooks/useTasksQueryState.ts';
import { TASK_VIEW_MODE } from '../model/task-filters/tasks-filter.constants.ts';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '../model/task-filters/tasks-filter.types.ts';
import { TasksGridView } from './task-card/tasks-grid-view.tsx';
import { TasksListView } from './task-card/tasks-list-view.tsx';
import { TaskPageHeader } from './common/task-page-header.tsx';

export function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);
    const [view, setView] = useState<TaskViewMode>(
        (localStorage.getItem(TASKS_VIEW_MODE) as TaskViewMode) || TASK_VIEW_MODE.GRID,
    );

    const {
        state: { status, q, sortBy, priority },
        searchParams,
        setSearch,
        updateParams,
    } = useTasksQueryState();

    const { isLoading: isTasksGetting } = useGetAllTasks(setTasks, searchParams);
    const { createTask, isLoading: isTaskCreating } = useCreateTasks();
    const { updateTask, isLoading: isTaskUpdating } = useUpdateTasks();
    const { deleteTask, isLoading: isTaskDeleting } = useDeleteTask();

    const deleteModal = useModalState();
    const createModal = useModalState();
    const editModal = useModalState();

    const filter = { status, sortBy, priority };

    async function handleSubmitCreateForm(values: TaskFormValues) {
        const createdTask = await createTask(values);

        setTasks((prevTasks) => [...prevTasks, createdTask]);
        createModal.closeModal();
    }

    async function handleSubmitEditForm(values: TaskFormValues) {
        if (!selectedTask) return;

        const updatedTask = await updateTask(values, selectedTask.id);

        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        );
        setSelectedTask(null);
        editModal.closeModal();
    }

    async function handleDeleteTask() {
        if (!selectedTask) return;

        await deleteTask(selectedTask.id);

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
        setSelectedTask(null);
        deleteModal.closeModal();
    }

    function handleCompleteTask(taskId: string) {
        completeTask(taskId);

        const updatedTask = getTaskById(taskId);

        if (!updatedTask) return;
        // TODO 5: DO LATER
        // setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? updatedTask : task)));
    }

    function handleTaskViewChange(value: TaskViewMode) {
        if (value === TASK_VIEW_MODE.LIST || value === TASK_VIEW_MODE.GRID) setView(value);
    }

    function handleStatusChange(status: TaskStatusFilter) {
        updateParams({ ...filter, status: status });
    }

    function handlePriorityChange(priority: TaskPriorityFilter) {
        updateParams({ ...filter, priority: priority });
    }

    function handleSortByChange(sortBy: TaskSortBy) {
        updateParams({ ...filter, sortBy: sortBy });
    }

    function handleOpenEditModal(task: Task) {
        setSelectedTask(task);

        editModal.openModal();
    }

    function handleOpenDeleteModal(task: Task) {
        setSelectedTask(task);
        deleteModal.openModal();
    }

    if (isTasksGetting) return <PageLoader />;

    return (
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            <TaskPageHeader
                tasksCount={tasks.length}
                onStatusChange={handleStatusChange}
                onPriorityChange={handlePriorityChange}
                onSortByChange={handleSortByChange}
                onTaskViewChange={handleTaskViewChange}
                openCreateModal={createModal.openModal}
                openEditModal={editModal.openModal}
                taskViewMode={view}
                searchValue={q}
                filters={filter}
                setSearchValue={setSearch}
            />
            {view === 'grid' ? (
                <TasksGridView
                    tasks={tasks}
                    onCompleteTask={handleCompleteTask}
                    onOpenEditModal={handleOpenEditModal}
                    onOpenDeleteModal={handleOpenDeleteModal}
                />
            ) : (
                <TasksListView tasks={tasks} />
            )}
            <CreateTaskModal
                onSubmit={handleSubmitCreateForm}
                setOpen={createModal.setOpen}
                isOpen={createModal.open}
                isTaskCreating={isTaskCreating}
            />
            {selectedTask && (
                <EditTaskModal
                    onSubmit={handleSubmitEditForm}
                    initialValues={selectedTask}
                    setOpen={editModal.setOpen}
                    isOpen={editModal.open}
                    isTaskUpdating={isTaskUpdating}
                />
            )}
            <DeleteTaskModal
                onDelete={handleDeleteTask}
                setOpen={deleteModal.setOpen}
                isOpen={deleteModal.open}
                isTaskDeleting={isTaskDeleting}
            />
        </div>
    );
}
