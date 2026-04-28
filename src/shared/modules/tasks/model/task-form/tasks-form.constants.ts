import { TASK_PRIORITY, TASK_STATUS } from '../task/task.constants.ts';

export const taskStatusOptions = [
    { value: TASK_STATUS.TODO, label: 'To Do' },
    { value: TASK_STATUS.IN_PROGRESS, label: 'In Progress' },
    { value: TASK_STATUS.DONE, label: 'Done' },
] as const;

export const taskPriorityOptions = [
    { value: TASK_PRIORITY.LOW, label: 'Low' },
    { value: TASK_PRIORITY.MEDIUM, label: 'Medium' },
    { value: TASK_PRIORITY.HIGH, label: 'High' },
] as const;
