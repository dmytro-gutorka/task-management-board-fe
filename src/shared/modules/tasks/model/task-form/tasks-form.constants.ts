import { TASK_PRIORITY, TASK_STATUS } from '../task/task.constants.ts';

export const getTaskStatusOptions = (t: (key: string, obj: { ns: string }) => string) => [
    { value: TASK_STATUS.TODO, label: t('filters.todo', { ns: 'tasks' }) },
    {
        value: TASK_STATUS.IN_PROGRESS,
        label: t('filters.inProgress', { ns: 'tasks' }),
    },
    { value: TASK_STATUS.DONE, label: t('filters.done', { ns: 'tasks' }) },
];

export const getTaskPriorityOptions = (t: (key: string, obj: { ns: string }) => string) => [
    { value: TASK_PRIORITY.LOW, label: t('filters.low', { ns: 'tasks' }) },
    { value: TASK_PRIORITY.MEDIUM, label: t('filters.medium', { ns: 'tasks' }) },
    { value: TASK_PRIORITY.HIGH, label: t('filters.high', { ns: 'tasks' }) },
];
