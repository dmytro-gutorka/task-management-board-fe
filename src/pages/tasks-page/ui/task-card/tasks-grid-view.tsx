import { PageLoader } from '../../../../shared/components/loader-page.tsx';
import type { Task } from '../../../../shared/modules/tasks/common/model/task.types.ts';
import { useGetTasksPage } from '../../model/common/api/hooks/useGetTasksPage.ts';
import { TasksPagination } from '../common/tasks-pagination.tsx';
import { TaskGridCard } from './tasks-card-grid.tsx';

interface TasksGridViewProps {
    onOpenEditModal: (task: Task) => void;
    onOpenDeleteModal: (task: Task) => void;
    onPageChange: (page: number) => void;
    searchParams: string;
    reloadKey: number;
}

export function TasksGridView({
    onOpenEditModal,
    onOpenDeleteModal,
    onPageChange,
    searchParams,
    reloadKey,
}: TasksGridViewProps) {
    const { tasks, isLoading, pagination } = useGetTasksPage(searchParams, reloadKey);

    // I do not have a new "fixed loader" in this branch, so I will replace PageLoader later when branches are merged
    return (
        <>
            <div>
                {isLoading && <PageLoader />}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 p-4">
                    {tasks.map((task: Task) => (
                        <TaskGridCard
                            key={task.id}
                            task={task}
                            onOpenEditModal={onOpenEditModal}
                            onOpenDeleteModal={onOpenDeleteModal}
                        />
                    ))}
                </div>
                <TasksPagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </>
    );
}
