import { ActionModal } from '@/shared/components/modal/ui/action-modal';
import { useState } from 'react';
import { logger } from '@/shared/lib/logger';
import { CreateTaskForm } from '@/pages/tasks/TasksPage/ui/task-forms/create-task-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { IconTooltip } from '@/shared/components/icon-tooltip';
import { Separator } from '@/components/ui/separator';

export function CreateTaskModal() {
    const [formOpen, setFormOpen] = useState(false);

    function handleSubmit() {
        logger.log('create task form');
    }

    return (
        <>
            <IconTooltip content="Create task">
                <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    aria-label="Create task"
                    onClick={() => setFormOpen(true)}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </IconTooltip>

            <ActionModal
                open={formOpen}
                onOpenChange={setFormOpen}
                title="Create task"
                description="Fill in the fields below."
                submitLabel="Create"
                onSubmit={handleSubmit}
            >
                <Separator />
                <CreateTaskForm onSubmit={handleSubmit} />
            </ActionModal>
        </>
    );
}
