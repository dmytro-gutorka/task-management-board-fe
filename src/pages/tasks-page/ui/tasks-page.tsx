import type { Task } from '../../../shared/modules/tasks/common/model/task.types.ts';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import type { Nullable } from '../../../shared/types/common.ts';
import { useIntersectionObserver } from '../model/common/hooks/useIntersectionObserver.ts';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '../model/task-filters/tasks-filter.types.ts';
import { useCallback, useRef, useState } from 'react';
import { PageLoader } from '../../../shared/components/loader-page.tsx';
import { Loader } from '../../../shared/components/loader.tsx';
import { useModalState } from '../../../shared/components/modal/model/hooks/useStateModal.ts';
import { EditTaskModal } from '../../../shared/modules/tasks/common/ui/edit-task-modal.tsx';
import { useCreateTasks } from '../model/common/api/hooks/useCreateTasks.ts';
import { useDeleteTask } from '../model/common/api/hooks/useDeleteTask.ts';
import { useGetAllTasks } from '../model/common/api/hooks/useGetAllTasks.ts';
import { useUpdateTasks } from '../model/common/api/hooks/useUpdateTasks.ts';
import { LS_KEY_TASKS_VIEW_MODE } from '../model/common/tasks-page.constants.ts';
import { TASK_VIEW_MODE } from '../model/task-filters/tasks-filter.constants.ts';
import { CreateTaskModal } from './task-modals/create-task-modal.tsx';
import { DeleteTaskModal } from './task-modals/delete-task-modal.tsx';
import { useTasksQueryState } from '../model/common/hooks/useTasksQueryState.ts';
import { TasksGridView } from './task-card/tasks-grid-view.tsx';
import { TasksListView } from './task-card/tasks-list-view.tsx';
import { TaskPageHeader } from './common/task-page-header.tsx';

export function TasksPage() {
    const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);
    const [view, setView] = useState<TaskViewMode>(
        (localStorage.getItem(LS_KEY_TASKS_VIEW_MODE) as TaskViewMode) || TASK_VIEW_MODE.GRID,
    );
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const {
        state: { status, q, sortBy, priority },
        searchParams,
        setSearch,
        updateParams,
    } = useTasksQueryState();

    const {
        tasks,
        setTasks,
        isLoading: isTasksGetting,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
    } = useGetAllTasks(searchParams);

    const { createTask, isLoading: isTaskCreating } = useCreateTasks();
    const { updateTask, isLoading: isTaskUpdating } = useUpdateTasks();
    const { deleteTask, isLoading: isTaskDeleting } = useDeleteTask();

    const deleteModal = useModalState();
    const createModal = useModalState();
    const editModal = useModalState();

    const filter = { status, sortBy, priority };

    const loadNextPage = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage || isTasksGetting) return;

        void fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isTasksGetting]);

    useIntersectionObserver({
        targetRef: loadMoreRef,
        enabled: hasNextPage && !isFetchingNextPage && !isTasksGetting,
        onIntersect: loadNextPage,
    });

    async function handleSubmitCreateForm(values: TaskFormValues) {
        await createTask(values);
        refetch();

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

    function handleTaskViewChange(value: TaskViewMode) {
        if (value === TASK_VIEW_MODE.LIST || value === TASK_VIEW_MODE.GRID) setView(value);
    }

    function handleStatusChange(status: TaskStatusFilter) {
        updateParams({ ...filter, status });
    }

    function handlePriorityChange(priority: TaskPriorityFilter) {
        updateParams({ ...filter, priority });
    }

    function handleSortByChange(sortBy: TaskSortBy) {
        updateParams({ ...filter, sortBy });
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
                    onOpenEditModal={handleOpenEditModal}
                    onOpenDeleteModal={handleOpenDeleteModal}
                />
            ) : (
                <TasksListView tasks={tasks} />
            )}

            <div ref={loadMoreRef} className="flex min-h-16 items-center justify-center py-4">
                {isFetchingNextPage && <Loader />}

                {!hasNextPage && tasks.length > 0 && (
                    <span className="text-sm text-muted-foreground">No more tasks</span>
                )}
            </div>

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

            {selectedTask && (
                <DeleteTaskModal
                    onDelete={handleDeleteTask}
                    setOpen={deleteModal.setOpen}
                    isOpen={deleteModal.open}
                    isTaskDeleting={isTaskDeleting}
                />
            )}
        </div>
    );
}
