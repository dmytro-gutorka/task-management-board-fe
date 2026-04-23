import { type LayoutOutletContext } from '@/shared/components/layout';
import { TasksGridView } from '@/pages/tasks/TasksPage/ui/task-card/tasks-grid-view';
import { TasksListView } from '@/pages/tasks/TasksPage/ui/task-card/tasks-list-view';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { getFilteredAndSortedTasks } from '@/pages/tasks/TasksPage/helpers/getFilteredAndSortedTasks';
import { mockTasks } from '@/pages/tasks/TasksPage/model/task-card/task-card.data';

export function TasksPage() {
    const { taskViewMode, filters, searchValue } = useOutletContext<LayoutOutletContext>();

    const filteredTasks = useMemo(() => {
        return getFilteredAndSortedTasks(mockTasks, filters, searchValue);
    }, [filters, searchValue]);

    return (
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            {taskViewMode === 'grid' ? (
                <TasksGridView tasks={filteredTasks} />
            ) : (
                <TasksListView tasks={filteredTasks} />
            )}
        </div>
    );
}
