import type { TaskFormInitialValues } from '../model/task-form/tasks-form.types.ts';
import type { Task } from '../model/task/task.types.ts';

export function mapTaskTiInitialValues(task: Task): TaskFormInitialValues {
    return {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        assigneeName: task.assigneeName,
        isPrivate: task.isPrivate,
        tags: task.tags,
    };
}
