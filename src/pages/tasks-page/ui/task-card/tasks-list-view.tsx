import { PageLoader } from '../../../../shared/components/loader-page.tsx';
import type { Task } from '../../../../shared/modules/tasks/common/model/task.types.ts';
import { useCallback, useRef } from 'react';
import { Loader } from '../../../../shared/components/loader.tsx';
import { useGetTasksFeed } from '../../model/common/api/hooks/useGetTasksFeed.ts';
import { useIntersectionObserver } from '../../model/common/hooks/useIntersectionObserver.ts';
import { TaskListCard } from './tasks-card-list.tsx';

interface TasksListViewProps {
    reloadKey: number;
}

export function TasksListView({ reloadKey }: TasksListViewProps) {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const { tasks, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useGetTasksFeed(reloadKey);

    const loadNextPage = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage || isLoading) return;

        void fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

    useIntersectionObserver({
        targetRef: loadMoreRef,
        enabled: hasNextPage && !isFetchingNextPage && !isLoading,
        onIntersect: loadNextPage,
    });

    // I do not have a new "fixed loader" in this branch, so I will replace PageLoader later when branches are merged
    return (
        <>
            {isLoading && <PageLoader />}
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
