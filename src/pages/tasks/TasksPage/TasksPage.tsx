import { TasksPageHeader } from '@/pages/tasks/TasksPage/ui/tasks-page-header';
import { TasksPageContent } from '@/pages/tasks/TasksPage/ui/tasks-page-content';

export function TasksPage() {
    return (
        <div>
            <TasksPageHeader />
            <TasksPageContent viewMode="grid" />
        </div>
    );
}
