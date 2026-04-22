// will be deleted later. It is just for testing purposes
// will be deleted later. It is just for testing purposes
// will be deleted later. It is just for testing purposes
// will be deleted later. It is just for testing purposes

import { EditTaskForm } from '@/pages/tasks/TasksPage/ui/task-forms/edit-task-form';
import { CreateTaskForm } from '@/pages/tasks/TasksPage/ui/task-forms/create-task-form';
import { logger } from '@/shared/lib/logger';
import { type TaskFormValues } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.types';

function MockTestPage() {
    const handleEditSubmit = (values: TaskFormValues) => {
        logger.log('edit task', values);
    };

    const handleCreateSubmit = (values: TaskFormValues) => {
        logger.log('create task', values);
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            <CreateTaskForm onSubmit={handleCreateSubmit} />

            <EditTaskForm
                initialValues={{
                    title: 'Prepare sprint summary',
                    description: 'Collect completed work items and prepare a summary.',
                    status: 'in-progress',
                    priority: 'high',
                    deadline: '2026-04-25',
                    assigneeName: 'Dmytro',
                    isPrivate: false,
                    tags: ['report', 'team'],
                }}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
}
export default MockTestPage;
