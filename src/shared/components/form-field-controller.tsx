import type { ComponentProps } from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from './shadcn/ui/field.tsx';
import { Input } from './shadcn/ui/input.tsx';

interface FormFieldControllerProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    placeholder?: string;
    type?: ComponentProps<typeof Input>['type'];
    fieldDescription?: string;
}

export function FormFieldController<TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = 'text',
    fieldDescription,
}: FormFieldControllerProps<TFieldValues>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>

                    <Input
                        {...field}
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        aria-label="type"
                    />
                    {fieldDescription && <FieldDescription>{fieldDescription}</FieldDescription>}
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
