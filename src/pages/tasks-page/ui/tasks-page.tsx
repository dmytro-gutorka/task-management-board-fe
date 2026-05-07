import { TasksApiService } from '../../../shared/modules/tasks/common/model/api/tasks.api-service.ts';
import { useCursorPagination } from '../../../shared/hooks/useCursorPagination.ts';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver.ts';
import { usePagePagination } from '../../../shared/hooks/usePagePagination.ts';
import type { Task } from '../../../shared/modules/tasks/common/model/task.types.ts';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import type { CursorParams } from '../../../shared/types/common.ts';
import { useTaskModals } from '../model/tasks-page/hooks/useTaskModals.ts';
import { useTasksSearch } from '../model/tasks-page/hooks/useTasksSearch.ts';
import { useTasksViewMode } from '../model/tasks-page/hooks/useTasksViewMode.ts';
import type { TasksQueryState } from '../model/tasks-query-state/tasks-query-state.types.ts';
import type { TasksCursorPaginatedResponse } from '../../../shared/modules/tasks/common/model/api/tasks.api-types.ts';
import { useCallback, useRef, useState } from 'react';
import { EditTaskModal } from '../../../shared/modules/tasks/common/ui/edit-task-modal.tsx';
import { useCreateTask } from '../../../shared/modules/tasks/common/model/api/hooks/useCreateTask.ts';
import { useDeleteTask } from '../../../shared/modules/tasks/common/model/api/hooks/useDeleteTask.ts';
import { useUpdateTask } from '../../../shared/modules/tasks/common/model/api/hooks/useUpdateTask.ts';
import { TASK_VIEW_MODE } from '../model/task-filters/tasks-filter.constants.ts';
import { CreateTaskModal } from './task-modals/create-task-modal.tsx';
import { DeleteTaskModal } from './task-modals/delete-task-modal.tsx';
import { useTasksQueryState } from '../model/common/hooks/useTasksQueryState.ts';
import { TasksGridView } from './task-card/tasks-grid-view.tsx';
import { TasksListView } from './task-card/tasks-list-view.tsx';
import { TaskPageHeader } from './common/task-page-header.tsx';

export function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const { queryParams, setSearch, updateParams } = useTasksQueryState();
    const { view, changeView } = useTasksViewMode();
    const { searchInputValue, setSearchInputValue } = useTasksSearch(queryParams.search, setSearch);

    const { createTask, isLoading: isTaskCreating } = useCreateTask();
    const { updateTask, isLoading: isTaskUpdating } = useUpdateTask();
    const { deleteTask, isLoading: isTaskDeleting } = useDeleteTask();

    const {
        selectedTask,
        setSelectedTask,
        createModal,
        editModal,
        deleteModal,
        openEditModal,
        openDeleteModal,
        closeEditModal,
        closeDeleteModal,
    } = useTaskModals();

    const findPageRequest = useCallback(
        (params: TasksQueryState, signal: AbortSignal) => TasksApiService.findPage(params, signal),
        [],
    );
    const findFeedPageRequest = useCallback(
        (params: CursorParams, signal: AbortSignal) => TasksApiService.findFeedPage(params, signal),
        [],
    );

    const { isLoading, pagination, refetchPage } = usePagePagination(
        findPageRequest,
        setTasks,
        queryParams,
        view === TASK_VIEW_MODE.GRID,
    );
    const { isFirstPageLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useCursorPagination<Task, TasksCursorPaginatedResponse, CursorParams>(
            findFeedPageRequest,
            setTasks,
            view === TASK_VIEW_MODE.LIST,
        );

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const loadNextPage = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage || isFirstPageLoading) return;

        void fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFirstPageLoading]);

    useIntersectionObserver({
        targetRef: loadMoreRef,
        enabled: hasNextPage && !isFetchingNextPage && !isFirstPageLoading,
        onIntersect: loadNextPage,
    });

    const filters = {
        status: queryParams.status,
        sortBy: queryParams.sortBy,
        priority: queryParams.priority,
    };

    async function handleSubmitCreateForm(values: TaskFormValues) {
        const createdTask = await createTask(values);

        if (!createdTask) return;

        await refetchPage();

        createModal.closeModal();
    }

    async function handleSubmitEditForm(values: TaskFormValues) {
        if (!selectedTask) return;

        const updatedTask = await updateTask(values, selectedTask.id);

        if (!updatedTask) return;

        await refetchPage();

        setSelectedTask(null);
        closeEditModal();
    }

    async function handleDeleteTask() {
        if (!selectedTask) return;

        await deleteTask(selectedTask.id);
        await refetchPage();

        setSelectedTask(null);
        closeDeleteModal();
    }

    function handleTaskQueryParamChange(queryParamValue: Partial<TasksQueryState>) {
        updateParams({ ...queryParamValue });
    }

    return (
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            <TaskPageHeader
                tasksCounter={pagination.total}
                onTaskQueryParamChange={handleTaskQueryParamChange}
                onTaskViewChange={changeView}
                openCreateModal={createModal.openModal}
                openEditModal={editModal.openModal}
                taskViewMode={view}
                filters={filters}
                setQuerySearchValue={setSearch}
                searchValue={searchInputValue}
                setSearchValue={setSearchInputValue}
            />

            {view === TASK_VIEW_MODE.GRID ? (
                <TasksGridView
                    onOpenEditModal={openEditModal}
                    onOpenDeleteModal={openDeleteModal}
                    onPageChange={handleTaskQueryParamChange}
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
