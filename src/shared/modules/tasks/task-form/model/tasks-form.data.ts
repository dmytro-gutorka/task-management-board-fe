import type { TaskFormValues } from './tasks-form.types.ts';
import { TASK_PRIORITY, TASK_STATUS } from '../../common/model/task.constants.ts';

export const taskFormDefaultValues: TaskFormValues = {
    title: '',
    description: '',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    deadline: '',
    isPrivate: false,
    latitude: null,
    longitude: null,
};
