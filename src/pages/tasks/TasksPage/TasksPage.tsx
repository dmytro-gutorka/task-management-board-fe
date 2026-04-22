import { TasksGridView } from '@/pages/tasks/TasksPage/ui/task-card/tasks-grid-view';
import { TasksListView } from '@/pages/tasks/TasksPage/ui/task-card/tasks-list-view';
import { Separator } from '@/components/ui/separator';

export function TasksPage() {
    return (
        <div>
            <TasksGridView />
            <Separator />
            <TasksListView />
        </div>
    );
}
