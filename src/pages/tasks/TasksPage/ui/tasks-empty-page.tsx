import { ClipboardList } from 'lucide-react';
import { EmptyPage } from '@/shared/pages/EmptyPage/EmptyPage';

export const TasksPageEmpty = () => {
    return (
        <EmptyPage
            icon={<ClipboardList className="h-6 w-6 text-muted-foreground" />}
            title="No tasks yet"
            description="You don't have any tasks yet. Create your first task to start managing your work."
            actionLabel="Create task"
            onAction={() => {}}
        />
    );
};
