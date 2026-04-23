type SelectFieldName = 'status' | 'priority';

export interface SelectConfig {
    placeholder: string;
    fieldName: SelectFieldName;
    label: string;
}

export interface SelectOption {
    value: string;
    label: string;
}
