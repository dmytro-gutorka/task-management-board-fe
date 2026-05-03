import { TASK_PRIORITY, TASK_STATUS } from '../../common/model/task.constants.ts';
import { type TFunction } from 'i18next';

export const getTaskStatusOptions = (t: TFunction) => [
    { value: TASK_STATUS.TODO, label: t('filters.todo', { ns: 'tasks' }) },
    {
        value: TASK_STATUS.IN_PROGRESS,
        label: t('filters.inProgress', { ns: 'tasks' }),
    },
    { value: TASK_STATUS.DONE, label: t('filters.done', { ns: 'tasks' }) },
];

export const getTaskPriorityOptions = (t: TFunction) => [
    { value: TASK_PRIORITY.LOW, label: t('filters.low', { ns: 'tasks' }) },
    { value: TASK_PRIORITY.MEDIUM, label: t('filters.medium', { ns: 'tasks' }) },
    { value: TASK_PRIORITY.HIGH, label: t('filters.high', { ns: 'tasks' }) },
];
