import { type TaskViewMode } from '@/pages/tasks/TasksPage/model/tasks.types';

interface TasksPageContentProps {
    viewMode: TaskViewMode;
}

export const TasksPageContent = ({ viewMode = 'grid' }: TasksPageContentProps) => {
    return (
        <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
            Tasks content will be rendered here. ${viewMode}
        </div>
    );
};
