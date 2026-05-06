import { PageLoaderOverlay } from '../../../shared/components/overlay-loader-page.tsx';
import { useDebounce } from '../../../shared/hooks/useDebounce.ts';
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
import { useEffect, useState } from 'react';
import { PageLoader } from '../../../shared/components/loader-page.tsx';
import { Loader } from '../../../shared/components/loader.tsx';
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
        useCursorPagination<Task, TasksCursorPaginatedResponse>(
            findFeedPageRequest,
            setTasks,
            view === TASK_VIEW_MODE.LIST,
        );

    const [searchInputValue, setSearchInputValue] = useState(q);
    const debouncedSearchValue = useDebounce(searchInputValue, 300);

    useEffect(() => {
        setSearch(debouncedSearchValue);
    }, [debouncedSearchValue, setSearch]);

    const { createTask, isLoading: isTaskCreating } = useCreateTasks();
    const { updateTask, isLoading: isTaskUpdating } = useUpdateTasks();
    const { deleteTask, isLoading: isTaskDeleting } = useDeleteTask();

    const deleteModal = useModalState();
    const createModal = useModalState();
    const editModal = useModalState();

    const filter = {
        status: queryParams.status,
        sortBy: queryParams.sortBy,
        priority: queryParams.priority,
    };

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

    const isInitialLoading = isTasksGetting && tasks.length === 0;
    const isOverlayLoading = isTasksGetting && tasks.length > 0;

    if (isInitialLoading) {
        return <PageLoader className="min-h-[320px]" />;
    }

    return (
        <div className="relative mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            {isOverlayLoading && <PageLoaderOverlay />}
            <TaskPageHeader
                tasksCounter={pagination.total}
                onTaskQueryParamChange={handleTaskQueryParamChange}
                onTaskViewChange={handleTaskViewChange}
                openCreateModal={createModal.openModal}
                openEditModal={editModal.openModal}
                taskViewMode={view}
                filters={filter}
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
