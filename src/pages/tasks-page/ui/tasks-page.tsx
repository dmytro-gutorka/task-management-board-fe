import { useMemo, useState } from 'react';
import { useModalState } from '../../../shared/components/modal/model/hooks/useStateModal.ts';
import type { TaskFormValues } from '../../../shared/modules/tasks/task-forms/model/tasks-form.types.ts';
import {
    completeTask,
    createTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateTask,
} from '../../../shared/modules/tasks/common/model/task.api.ts';
import type { Task } from '../../../shared/modules/tasks/common/model/task.types.ts';
import { CreateTaskModal } from '../../../shared/modules/tasks/task-modals/ui/create-task-modal.tsx';
import { DeleteTaskModal } from '../../../shared/modules/tasks/task-modals/ui/delete-task-modal.tsx';
import { EditTaskModal } from '../../../shared/modules/tasks/task-modals/ui/edit-task-modal.tsx';
import type { Nullable } from '../../../shared/types/common.ts';
import { getFilteredAndSortedTasks } from '../helpers/getFilteredAndSortedTasks.ts';
import { useTasksQueryState } from '../hooks/useTasksQueryState.ts';
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

// ВОТ ТУТ СЕЙЧАС КАША ИЗ ХЕНДЛЕРОВ И СТЕЙТОВ, Я ПОДУМАЮ ПОЗЖЕ КАК ЭТО МОЖНО КРАСИВО РАЗДЕЛИТЬ/РАЗНЕСТИ ПО ХУКАМ
// ВОТ ТУТ СЕЙЧАС КАША ИЗ ХЕНДЛЕРОВ И СТЕЙТОВ, Я ПОДУМАЮ ПОЗЖЕ КАК ЭТО МОЖНО КРАСИВО РАЗДЕЛИТЬ/РАЗНЕСТИ ПО ХУКАМ
// ВОТ ТУТ СЕЙЧАС КАША ИЗ ХЕНДЛЕРОВ И СТЕЙТОВ, Я ПОДУМАЮ ПОЗЖЕ КАК ЭТО МОЖНО КРАСИВО РАЗДЕЛИТЬ/РАЗНЕСТИ ПО ХУКАМ
// ВОТ ТУТ СЕЙЧАС КАША ИЗ ХЕНДЛЕРОВ И СТЕЙТОВ, Я ПОДУМАЮ ПОЗЖЕ КАК ЭТО МОЖНО КРАСИВО РАЗДЕЛИТЬ/РАЗНЕСТИ ПО ХУКАМ

export function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(getTasks());
    const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);

    const deleteModal = useModalState();
    const createModal = useModalState();
    const editModal = useModalState();

    const {
        state: { view, status, search, sortBy, priority },
        setSearch,
        setView,
        updateParams,
    } = useTasksQueryState();

    const filter = { status, sortBy, priority };
    const filteredTasks = useMemo(() => {
        return getFilteredAndSortedTasks(tasks ?? [], { status, sortBy, priority }, search);
    }, [tasks, status, sortBy, priority, search]);

    function handleSubmitCreateForm(values: TaskFormValues) {
        const tasks = createTask(values);

        setTasks((prevTasks) => [...prevTasks, tasks]);
        createModal.closeModal();
    }

    function handleCompleteTask(taskId: string) {
        completeTask(taskId);

        const updatedTask = getTaskById(taskId);
        if (!updatedTask) return;

        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? updatedTask : task)));
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

    function handleSubmitEditForm(values: TaskFormValues) {
        if (!selectedTask) return;

        const updatedTask = updateTask(selectedTask.id, values);

        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === selectedTask.id ? updatedTask : task)),
        );

        setSelectedTask(null);
        editModal.closeModal();
    }

    function handleOpenDeleteModal(task: Task) {
        setSelectedTask(task);
        deleteModal.openModal();
    }

    function handleDeleteTask() {
        if (!selectedTask) return;

        deleteTask(selectedTask.id);

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));

        setSelectedTask(null);
        deleteModal.closeModal();
    }

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
                searchValue={search}
                filters={filter}
                setSearchValue={setSearch}
            />
            {view === 'grid' ? (
                <TasksGridView
                    tasks={filteredTasks}
                    onCompleteTask={handleCompleteTask}
                    onOpenEditModal={handleOpenEditModal}
                    onOpenDeleteModal={handleOpenDeleteModal}
                />
            ) : (
                <TasksListView tasks={filteredTasks} />
            )}
            <CreateTaskModal
                onSubmit={handleSubmitCreateForm}
                setOpen={createModal.setOpen}
                isOpen={createModal.open}
            />
            {selectedTask && (
                <EditTaskModal
                    onSubmit={handleSubmitEditForm}
                    initialValues={selectedTask}
                    setOpen={editModal.setOpen}
                    isOpen={editModal.open}
                />
            )}
            <DeleteTaskModal
                onDelete={handleDeleteTask}
                setOpen={deleteModal.setOpen}
                isOpen={deleteModal.open}
            />
        </div>
    );
}
