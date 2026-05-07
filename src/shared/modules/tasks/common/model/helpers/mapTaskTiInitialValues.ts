import type { TaskFormInitialValues } from '../../../task-form/model/tasks-form.types.ts';
import type { Task } from '../task.types.ts';

export function mapTaskTiInitialValues(task: Task): TaskFormInitialValues {
    return {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        isPrivate: task.isPrivate,
    };
}
