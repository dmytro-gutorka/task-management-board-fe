import type { TaskFormValues } from '@/shared/modules/tasks/model/task-form/tasks-form.types.ts';
import { TASK_PRIORITY, TASK_STATUS } from '@/shared/modules/tasks/model/task/task.constants.ts';

export const taskFormDefaultValues: TaskFormValues = {
    title: '',
    description: '',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    deadline: '',
    assigneeName: '',
    isPrivate: false,
    tags: [],
};
