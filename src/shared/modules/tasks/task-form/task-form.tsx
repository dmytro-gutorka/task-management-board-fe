import { FormFieldController } from '../../../components/form-field-controller.tsx';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '../../../components/shadcn/ui/field.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectInput } from '../../../components/select/select-input.tsx';
import { Switch } from '../../../components/shadcn/ui/switch.tsx';
import { buildTaskFormDefaultValues } from './helpers/buildTaskFormDefaultValues.ts';
import {
    getTaskPrioritySelectConfig,
    getTaskStatusSelectConfig,
} from './model/tasks-form.configs.ts';
import { getTaskPriorityOptions, getTaskStatusOptions } from './model/tasks-form.constants.ts';
import { taskFormSchema } from './model/tasks-form.schema.ts';
import type { TaskFormInitialValues, TaskFormValues } from './model/tasks-form.types.ts';

interface TaskFormProps {
    initialValues?: Partial<TaskFormInitialValues>;
    onSubmit: (values: TaskFormValues) => void | Promise<void>;
    formId: string;
}

export function TaskForm({ initialValues, onSubmit, formId }: TaskFormProps) {
    const { t } = useTranslation(['common', 'form']);
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: buildTaskFormDefaultValues(initialValues),
        mode: 'onSubmit',
    });

    return (
        <form
            id={formId}
            onSubmit={(event) => {
                void form.handleSubmit(onSubmit)(event);
            }}
            className="space-y-8"
        >
            <FieldGroup>
                <FormFieldController
                    control={form.control}
                    name="title"
                    placeholder={t('form.titlePlaceholder', { ns: 'tasks' })}
                    label={t('form.titleDescription', { ns: 'tasks' })}
                    fieldDescription={t('form.titleDescription', { ns: 'tasks' })}
                />
                <FormFieldController
                    control={form.control}
                    name="description"
                    placeholder={t('form.descriptionPlaceholder', { ns: 'tasks' })}
                    label={t('form.description', { ns: 'tasks' })}
                    fieldDescription={t('form.descriptionDescription', { ns: 'tasks' })}
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <SelectInput
                        form={form}
                        selectConfig={getTaskStatusSelectConfig(t)}
                        selectOptions={getTaskStatusOptions(t)}
                    />

                    <SelectInput
                        form={form}
                        selectConfig={getTaskPrioritySelectConfig(t)}
                        selectOptions={getTaskPriorityOptions(t)}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <FormFieldController
                        control={form.control}
                        name="deadline"
                        type="date"
                        placeholder={t('form.descriptionPlaceholder', { ns: 'tasks' })}
                        label={t('form.deadline', { ns: 'tasks' })}
                        fieldDescription={t('form.deadlineDescription', { ns: 'tasks' })}
                    />
                </div>
                <Controller
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                        <Field
                            orientation="horizontal"
                            className="items-center justify-between rounded-xl border p-4"
                        >
                            <div className="space-y-1">
                                <FieldLabel>{t('form.isPrivate', { ns: 'tasks' })}</FieldLabel>
                                <FieldDescription>
                                    {t('form.isPrivateDescription', { ns: 'tasks' })}
                                </FieldDescription>
                            </div>

                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    );
}
