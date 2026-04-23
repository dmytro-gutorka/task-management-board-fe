import { TasksGridView } from '@/pages/tasks/TasksPage/ui/task-card/tasks-grid-view';
import { TasksListView } from '@/pages/tasks/TasksPage/ui/task-card/tasks-list-view';
import { useOutletContext } from 'react-router-dom';
import { type LayoutOutletContext } from '@/shared/components/layout';

export function TasksPage() {
    const { taskViewMode } = useOutletContext<LayoutOutletContext>();

    return (
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 my-4">
            {taskViewMode === 'grid' ? <TasksGridView /> : <TasksListView />}
        </div>
    );
}
