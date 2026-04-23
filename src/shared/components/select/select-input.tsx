import { Controller, type UseFormReturn } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';

import type { TaskFormValues } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.types';
import type {
    SelectConfig,
    SelectOption,
} from '@/shared/components/select/model/select-input.types';

interface SelectInputProps {
    form: UseFormReturn<TaskFormValues>;
    selectOptions: readonly SelectOption[];
    selectConfig: SelectConfig;
}

export function SelectInput({ form, selectOptions, selectConfig }: SelectInputProps) {
    const { control } = form;
    const name = selectConfig.fieldName;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`select-${name}`}>{selectConfig.label}</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id={`select-${name}`} aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder={selectConfig.placeholder} />
                        </SelectTrigger>

                        <SelectContent>
                            {selectOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectConfig.description ? (
                        <FieldDescription>{selectConfig.description}</FieldDescription>
                    ) : null}

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
