import { useDebounce } from '../../../shared/hooks/useDebounce.ts';
import { TasksApiService } from '../../../shared/modules/tasks/common/model/api/tasks.api-service.ts';
import { useCursorPagination } from '../../../shared/hooks/useCursorPagination.ts';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver.ts';
import { usePagePagination } from '../../../shared/hooks/usePagePagination.ts';
import type { Task } from '../../../shared/modules/tasks/common/model/task.types.ts';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-form/model/tasks-form.types.ts';
import type { CursorParams, Nullable } from '../../../shared/types/common.ts';
import type { TasksQueryState } from '../model/tasks-query-state/tasks-query-state.types.ts';
import type { TasksCursorPaginatedResponse } from '../../../shared/modules/tasks/common/model/api/tasks.api-types.ts';
import type { TaskViewMode } from '../model/task-filters/tasks-filter.types.ts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModalState } from '../../../shared/components/modal/model/hooks/useStateModal.ts';
import { EditTaskModal } from '../../../shared/modules/tasks/common/ui/edit-task-modal.tsx';
import { useCreateTask } from '../../../shared/modules/tasks/common/model/api/hooks/useCreateTask.ts';
import { useDeleteTask } from '../../../shared/modules/tasks/common/model/api/hooks/useDeleteTask.ts';
import { useUpdateTask } from '../../../shared/modules/tasks/common/model/api/hooks/useUpdateTask.ts';
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

    const { queryParams, setSearch, updateParams } = useTasksQueryState();

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

    const loadNextPage = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage || isFirstPageLoading) return;

        void fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFirstPageLoading]);

    useIntersectionObserver({
        targetRef: loadMoreRef,
        enabled: hasNextPage && !isFetchingNextPage && !isFirstPageLoading,
        onIntersect: loadNextPage,
    });

    const { createTask, isLoading: isTaskCreating } = useCreateTask();
    const { updateTask, isLoading: isTaskUpdating } = useUpdateTask();
    const { deleteTask, isLoading: isTaskDeleting } = useDeleteTask();

    const deleteModal = useModalState();
    const createModal = useModalState();
    const editModal = useModalState();

    const memoFilters = useMemo(
        () => ({
            status: queryParams.status,
            sortBy: queryParams.sortBy,
            priority: queryParams.priority,
        }),
        [queryParams.status, queryParams.sortBy, queryParams.priority],
    );

    async function handleSubmitCreateForm(values: TaskFormValues) {
        await createTask(values);
        await refetchPage();

        createModal.closeModal();
    }

    async function handleSubmitEditForm(values: TaskFormValues) {
        if (!selectedTask) return;

        await updateTask(values, selectedTask.id);
        await refetchPage();

        setSelectedTask(null);
        editModal.closeModal();
    }

    async function handleDeleteTask() {
        if (!selectedTask) return;

        await deleteTask(selectedTask.id);
        await refetchPage();

        setSelectedTask(null);
        deleteModal.closeModal();
    }

    function handleOpenEditModal(task: Task) {
        setSelectedTask(task);
        editModal.openModal();
    }

    function handleOpenDeleteModal(task: Task) {
        setSelectedTask(task);
        deleteModal.openModal();
    }

    function handleTaskViewChange(taskViewMode: TaskViewMode) {
        if (taskViewMode === TASK_VIEW_MODE.LIST || taskViewMode === TASK_VIEW_MODE.GRID) {
            localStorage.setItem(LS_KEY_TASKS_VIEW_MODE, taskViewMode);
            setView(taskViewMode);
            setTasks([]);
        }
    }
    function handleTaskQueryParamChange(queryParamValue: Partial<TasksQueryState>) {
        updateParams({ ...queryParamValue });
    }

    const [searchInputValue, setSearchInputValue] = useState(queryParams.search);
    const debouncedSearchValue = useDebounce(searchInputValue, 300);

    useEffect(() => {
        setSearch(debouncedSearchValue);
    }, [debouncedSearchValue, setSearch]);

    return (
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            <TaskPageHeader
                tasksCounter={pagination.total}
                onTaskQueryParamChange={handleTaskQueryParamChange}
                onTaskViewChange={handleTaskViewChange}
                openCreateModal={createModal.openModal}
                openEditModal={editModal.openModal}
                taskViewMode={view}
                filters={memoFilters}
                setQuerySearchValue={setSearch}
                searchValue={searchInputValue}
                setSearchValue={setSearchInputValue}
            />

            {view === TASK_VIEW_MODE.GRID ? (
                <TasksGridView
                    onOpenEditModal={handleOpenEditModal}
                    onOpenDeleteModal={handleOpenDeleteModal}
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
