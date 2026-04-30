import { TASK_PRIORITY, TASK_STATUS } from '@/shared/modules/tasks/model/task/task.constants.ts';
import { CheckCircle2, Circle, Clock3 } from 'lucide-react';

export const getTaskStatusConfig = (t: (key: string) => string) =>
    ({
        [TASK_STATUS.TODO]: {
            badgeClassName: 'border-transparent bg-muted text-muted-foreground',
            badgeTitle: t('tasks.filters.todo'),
            icon: Circle,
            listViewIconClassName: 'h-4 w-4 shrink-0 text-muted-foreground',
        },
        [TASK_STATUS.IN_PROGRESS]: {
            badgeClassName:
                'border-transparent bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
            badgeTitle: t('tasks.filters.inProgress'),
            icon: Clock3,
            listViewIconClassName: 'h-4 w-4 shrink-0 text-blue-600',
        },
        [TASK_STATUS.DONE]: {
            badgeClassName:
                'border-transparent bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
            badgeTitle: t('tasks.filters.done'),
            icon: CheckCircle2,
            listViewIconClassName: 'h-4 w-4 shrink-0 text-green-600',
        },
    }) as const;

export const getTaskPriorityConfig = (t: (key: string) => string) =>
    ({
        [TASK_PRIORITY.LOW]: {
            badgeClassName:
                'border-transparent bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300',
            badgeTitle: t('tasks.filters.low'),
        },
        [TASK_PRIORITY.MEDIUM]: {
            badgeClassName:
                'border-transparent bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
            badgeTitle: t('tasks.filters.medium'),
        },
        [TASK_PRIORITY.HIGH]: {
            badgeClassName:
                'border-transparent bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
            badgeTitle: t('tasks.filters.high'),
        },
    }) as const;
