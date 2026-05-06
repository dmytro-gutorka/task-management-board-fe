import type { RefObject } from 'react';
import type { Task } from '../../../../shared/modules/tasks/common/model/task.types.ts';
import { PageLoader } from '../../../../shared/components/loader-page.tsx';
import { Loader } from '../../../../shared/components/loader.tsx';
import { TaskListCard } from './tasks-card-list.tsx';

interface TasksListViewProps {
    isFirstPageLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    tasks: Task[];
    loadMoreRef: RefObject<HTMLDivElement | null>;
}

export function TasksListView({
    isFirstPageLoading,
    isFetchingNextPage,
    hasNextPage,
    tasks,
    loadMoreRef,
}: TasksListViewProps) {
    return (
        <>
            {isFirstPageLoading && <PageLoader />}
            <div className="space-y-3">
                {tasks.map((task: Task) => (
                    <TaskListCard key={task.id} task={task} />
                ))}
            </div>

            <div ref={loadMoreRef} className="flex min-h-16 items-center justify-center py-4">
                {isFetchingNextPage && <Loader />}

                {!hasNextPage && tasks.length > 0 && (
                    <span className="text-sm text-muted-foreground">No more tasks</span>
                )}
            </div>
        </>
    );
}
