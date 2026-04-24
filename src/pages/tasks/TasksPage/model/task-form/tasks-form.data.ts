import type { TaskFormValues } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.types';
import { TASK_PRIORITY, TASK_STATUS } from '@/pages/tasks/TasksPage/model/task.constants';

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
