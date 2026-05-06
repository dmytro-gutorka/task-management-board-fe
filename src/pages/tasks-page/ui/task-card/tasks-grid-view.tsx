import { PageLoader } from '../../../../shared/components/loader-page.tsx';
import { TasksPagination } from '../common/tasks-pagination.tsx';
import { TaskGridCard } from './tasks-card-grid.tsx';
import type { PaginationParams } from '../../../../shared/types/common.ts';
import type { Task } from '../../../../shared/modules/tasks/common/model/task.types.ts';

interface TasksGridViewProps {
    onOpenEditModal: (task: Task) => void;
    onOpenDeleteModal: (task: Task) => void;
    onPageChange: (page: number) => void;
    tasks: Task[];
    isLoading: boolean;
    pagination: PaginationParams;
}

export function TasksGridView({
    onOpenEditModal,
    onOpenDeleteModal,
    onPageChange,
    tasks,
    isLoading,
    pagination,
}: TasksGridViewProps) {
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
