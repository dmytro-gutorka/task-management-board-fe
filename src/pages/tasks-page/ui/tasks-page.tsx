import { TasksApiService } from '../model/common/api/tasks.api-service.ts';
import { useCursorPagination } from '../../../shared/hooks/useCursorPagination.ts';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver.ts';
import { usePagePagination } from '../../../shared/hooks/usePagePagination.ts';
import type { Task } from '../../../shared/modules/tasks/common/model/task.types.ts';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import type { Nullable } from '../../../shared/types/common.ts';
import type { TasksCursorPaginatedResponse } from '../model/common/api/tasks.api-types.ts';
import type {
    TaskPriorityFilter,
    TaskSortBy,
    TaskStatusFilter,
    TaskViewMode,
} from '../model/task-filters/tasks-filter.types.ts';
import { useCallback, useRef, useState } from 'react';
import { useModalState } from '../../../shared/components/modal/model/hooks/useStateModal.ts';
import { EditTaskModal } from '../../../shared/modules/tasks/common/ui/edit-task-modal.tsx';
import { useCreateTasks } from '../model/common/api/hooks/useCreateTasks.ts';
import { useDeleteTask } from '../model/common/api/hooks/useDeleteTask.ts';
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
    const [tasks, setTasks] = useState<Task[]>([]);
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

    const findPageRequest = useCallback(
        (searchParams: URLSearchParams, signal: AbortSignal) =>
            TasksApiService.findPage(searchParams, signal),
        [],
    );
    const findFeedPageRequest = useCallback(
        (params: URLSearchParams, signal: AbortSignal) =>
            TasksApiService.findFeedPage(params, signal),
        [],
    );

    const { isLoading, pagination, refetchPage } = usePagePagination(
        findPageRequest,
        setTasks,
        searchParams,
        view === TASK_VIEW_MODE.GRID,
    );
    const { isFirstPageLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useCursorPagination<Task, TasksCursorPaginatedResponse>(
            findFeedPageRequest,
            setTasks,
            view === TASK_VIEW_MODE.LIST,
        );

    const loadNextPage = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage || isFirstPageLoading) return;

        void fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFirstPageLoading]);

    useIntersectionObserver({
        targetRef: loadMoreRef,
        enabled: hasNextPage && !isFetchingNextPage && !isFirstPageLoading,
        onIntersect: loadNextPage,
    });

    const { createTask, isLoading: isTaskCreating } = useCreateTasks();
    const { updateTask, isLoading: isTaskUpdating } = useUpdateTasks();
    const { deleteTask, isLoading: isTaskDeleting } = useDeleteTask();

    const deleteModal = useModalState();
    const createModal = useModalState();
    const editModal = useModalState();

    const filter = { status, sortBy, priority };

    async function handleSubmitCreateForm(values: TaskFormValues) {
        await createTask(values);

        refetchPage();
        createModal.closeModal();
    }

    async function handleSubmitEditForm(values: TaskFormValues) {
        if (!selectedTask) return;

        await updateTask(values, selectedTask.id);

        refetchPage();
        setSelectedTask(null);
        editModal.closeModal();
    }

    async function handleDeleteTask() {
        if (!selectedTask) return;

        await deleteTask(selectedTask.id);

        refetchPage();
        setSelectedTask(null);
        deleteModal.closeModal();
    }

    function handleTaskViewChange(taskViewMode: TaskViewMode) {
        if (taskViewMode === TASK_VIEW_MODE.LIST || taskViewMode === TASK_VIEW_MODE.GRID) {
            setView(taskViewMode);
            setTasks([]);
        }
    }

    function handleStatusChange(status: TaskStatusFilter) {
        updateParams({ ...filter, status, page: '1' });
    }

    function handlePriorityChange(priority: TaskPriorityFilter) {
        updateParams({ ...filter, priority, page: '1' });
    }

    function handleSortByChange(sortBy: TaskSortBy) {
        updateParams({ ...filter, sortBy, page: '1' });
    }

    function handlePageChange(page: number) {
        updateParams({ ...filter, page: String(page) });
    }

    function handleOpenEditModal(task: Task) {
        setSelectedTask(task);
        editModal.openModal();
    }

    function handleOpenDeleteModal(task: Task) {
        setSelectedTask(task);
        deleteModal.openModal();
    }

    return (
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            <TaskPageHeader
                tasksCounter={tasks.length}
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

            {view === TASK_VIEW_MODE.GRID ? (
                <TasksGridView
                    onOpenEditModal={handleOpenEditModal}
                    onOpenDeleteModal={handleOpenDeleteModal}
                    onPageChange={handlePageChange}
                    tasks={tasks}
                    isLoading={isLoading}
                    pagination={pagination}
                />
            ) : (
                <TasksListView
                    tasks={tasks}
                    isFirstPageLoading={isFirstPageLoading}
                    isFetchingNextPage={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                    loadMoreRef={loadMoreRef}
                />
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
