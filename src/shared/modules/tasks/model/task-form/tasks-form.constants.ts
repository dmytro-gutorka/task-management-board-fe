import { TASK_PRIORITY, TASK_STATUS } from '../task/task.constants.ts';

export const getTaskStatusOptions = (t: (key: string) => string) => [
    { value: TASK_STATUS.TODO, label: t('tasks.filters.todo') },
    { value: TASK_STATUS.IN_PROGRESS, label: t('tasks.filters.inProgress') },
    { value: TASK_STATUS.DONE, label: t('tasks.filters.done') },
];

export const getTaskPriorityOptions = (t: (key: string) => string) => [
    { value: TASK_PRIORITY.LOW, label: t('tasks.filters.low') },
    { value: TASK_PRIORITY.MEDIUM, label: t('tasks.filters.medium') },
    { value: TASK_PRIORITY.HIGH, label: t('tasks.filters.high') },
];

// Fallback for components not yet updated
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
