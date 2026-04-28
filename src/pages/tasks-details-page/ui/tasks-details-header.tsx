import { Button } from '@/shared/components/shadcn/ui/button.tsx';
import { ArrowLeft } from 'lucide-react';
import { EditTaskModal } from '@/shared/modules/tasks/ui/task-modals/edit-task-modal.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routes.constants.ts';

export function TasksDetailsHeader() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={() => void navigate(ROUTES.TASKS_PAGE)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to tasks
            </Button>
            <EditTaskModal />
        </div>
    );
}
