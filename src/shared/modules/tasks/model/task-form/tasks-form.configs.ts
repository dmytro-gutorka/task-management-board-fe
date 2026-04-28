import { type SelectConfig } from '@/shared/components/select/model/select-input.types.ts';

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
