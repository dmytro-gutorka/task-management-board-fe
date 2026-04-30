import { type SelectConfig } from '@/shared/components/select/model/select-input.types.ts';

export const getTaskStatusSelectConfig = (t: (key: string) => string): SelectConfig => ({
    label: t('tasks.form.status'),
    placeholder: t('tasks.form.statusPlaceholder'),
    fieldName: 'status',
    description: t('tasks.form.statusDescription'),
});

export const getTaskPrioritySelectConfig = (t: (key: string) => string): SelectConfig => ({
    label: t('tasks.form.priority'),
    placeholder: t('tasks.form.priorityPlaceholder'),
    fieldName: 'priority',
    description: t('tasks.form.priorityDescription'),
});

// Fallback for components not yet updated
export const taskStatusSelectConfig: SelectConfig = {
    label: 'Status',
    placeholder: 'Select status',
    fieldName: 'status',
    description: 'Choose the current task status.',
};

export const taskPrioritySelectConfig: SelectConfig = {
    label: 'Priority',
    placeholder: 'Select priority',
    fieldName: 'priority',
    description: 'Set how important this task is.',
};
