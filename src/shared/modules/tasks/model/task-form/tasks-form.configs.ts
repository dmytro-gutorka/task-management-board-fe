import { type SelectConfig } from '@/shared/components/select/model/select-input.types.ts';

export const getTaskStatusSelectConfig = (
    t: (key: string, obj: { ns: string }) => string,
): SelectConfig => ({
    label: t('form.status', { ns: 'tasks' }),
    placeholder: t('form.statusPlaceholder', { ns: 'tasks' }),
    fieldName: 'status',
    description: t('form.statusDescription', { ns: 'tasks' }),
});

export const getTaskPrioritySelectConfig = (
    t: (key: string, obj: { ns: string }) => string,
): SelectConfig => ({
    label: t('form.priority', { ns: 'tasks' }),
    placeholder: t('form.priorityPlaceholder', { ns: 'tasks' }),
    fieldName: 'priority',
    description: t('form.priorityDescription', { ns: 'tasks' }),
});
