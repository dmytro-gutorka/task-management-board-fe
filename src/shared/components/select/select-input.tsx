import { Controller } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/shadcn/ui/select';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/shared/components/shadcn/ui/field';
import type {
    SelectOption,
    SelectConfig,
} from '@/shared/components/select/model/select-input.types';
import type { UseFormReturn } from 'react-hook-form';
import type { TaskFormValues } from '../../modules/tasks/task-forms/model/tasks-form.types.ts';

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

                    {selectConfig.description && (
                        <FieldDescription>{selectConfig.description}</FieldDescription>
                    )}

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
