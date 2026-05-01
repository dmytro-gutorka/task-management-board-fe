import { TASK_PRIORITY, TASK_STATUS } from '../../common/model/task.constants.ts';
import { CheckCircle2, Circle, Clock3 } from 'lucide-react';
import type { TFunction } from 'i18next';

export const getTaskStatusConfig = (t: TFunction) =>
    ({
        [TASK_STATUS.TODO]: {
            badgeClassName: 'border-transparent bg-muted text-muted-foreground',
            badgeTitle: t('filters.todo', { ns: 'tasks' }),
            icon: Circle,
            listViewIconClassName: 'h-4 w-4 shrink-0 text-muted-foreground',
        },
        [TASK_STATUS.IN_PROGRESS]: {
            badgeClassName:
                'border-transparent bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
            badgeTitle: t('filters.inProgress', { ns: 'tasks' }),
            icon: Clock3,
            listViewIconClassName: 'h-4 w-4 shrink-0 text-blue-600',
        },
        [TASK_STATUS.DONE]: {
            badgeClassName:
                'border-transparent bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
            badgeTitle: t('filters.done', { ns: 'tasks' }),
            icon: CheckCircle2,
            listViewIconClassName: 'h-4 w-4 shrink-0 text-green-600',
        },
    }) as const;

export const getTaskPriorityConfig = (t: TFunction) =>
    ({
        [TASK_PRIORITY.LOW]: {
            badgeClassName:
                'border-transparent bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300',
            badgeTitle: t('filters.low', { ns: 'tasks' }),
        },
        [TASK_PRIORITY.MEDIUM]: {
            badgeClassName:
                'border-transparent bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
            badgeTitle: t('filters.medium', { ns: 'tasks' }),
        },
        [TASK_PRIORITY.HIGH]: {
            badgeClassName:
                'border-transparent bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
            badgeTitle: t('filters.high', { ns: 'tasks' }),
        },
    }) as const;
