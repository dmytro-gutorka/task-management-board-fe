import { type SelectConfig } from '@/shared/components/select/model/select-input.types';

export const taskStatusSelectConfig: SelectConfig = {
    label: 'Status',
    placeholder: 'Select status',
    fieldName: 'status',
};

export const taskPrioritySelectConfig: SelectConfig = {
    label: 'Priority',
    placeholder: 'Select priority',
    fieldName: 'priority',
};
