import { type SelectConfig } from '../../../../components/select/model/select-input.types.ts';
import type { TFunction } from 'i18next';

export const getTaskStatusSelectConfig = (t: TFunction): SelectConfig => ({
    label: t('form.status', { ns: 'tasks' }),
    placeholder: t('form.statusPlaceholder', { ns: 'tasks' }),
    fieldName: 'status',
    description: t('form.statusDescription', { ns: 'tasks' }),
});

export const getTaskPrioritySelectConfig = (t: TFunction): SelectConfig => ({
    label: t('form.priority', { ns: 'tasks' }),
    placeholder: t('form.priorityPlaceholder', { ns: 'tasks' }),
    fieldName: 'priority',
    description: t('form.priorityDescription', { ns: 'tasks' }),
});
