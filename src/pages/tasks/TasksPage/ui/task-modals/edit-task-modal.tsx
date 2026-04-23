import { useState } from 'react';
import { logger } from '@/shared/lib/logger';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { ActionModal } from '@/shared/components/modal/ui/action-modal';
import { EditTaskForm } from '@/pages/tasks/TasksPage/ui/task-forms/edit-task-form';
import { taskFormDefaultValues } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.data';

export function EditTaskModal() {
    const [formOpen, setFormOpen] = useState(false);

    function handleSubmit() {
        logger.log('edit task form');
    }

    return (
        <>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setFormOpen(true)}>
                <Pencil className="h-4 w-4" />
                Edit
            </Button>

            <ActionModal
                open={formOpen}
                onOpenChange={setFormOpen}
                title="Edit task"
                description="Fill in the fields below."
                submitLabel="Edit"
                onSubmit={handleSubmit}
            >
                <EditTaskForm initialValues={taskFormDefaultValues} onSubmit={handleSubmit} />
            </ActionModal>
        </>
    );
}
