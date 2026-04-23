import { Controller, type UseFormReturn } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type TaskFormValues } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.types';
import {
    type SelectConfig,
    type SelectOption,
} from '@/shared/components/select/model/select-input.types';

interface SelectInputProps {
    form: UseFormReturn<TaskFormValues>;
    selectOptions: readonly SelectOption[];
    selectConfig: SelectConfig;
}

export function SelectInput({ form, selectOptions, selectConfig }: SelectInputProps) {
    const { control } = form;

    const name = selectConfig.fieldName;
    const errors = form.formState.errors[name];

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
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
                )}
            />
            {errors ? <p className="text-sm text-destructive">{errors.message}</p> : null}
        </div>
    );
}
