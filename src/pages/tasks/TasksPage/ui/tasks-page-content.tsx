import { type TaskViewMode } from '@/pages/tasks/TasksPage/model/tasks.types';

interface TasksPageContentProps {
    viewMode: TaskViewMode;
}

export const TasksPageContent = ({ viewMode = 'grid' }: TasksPageContentProps) => {
    return <div>Content Page ${viewMode}</div>;
};
