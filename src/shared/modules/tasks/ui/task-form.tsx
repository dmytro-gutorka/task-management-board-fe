import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../components/shadcn/ui/input.tsx';
import { Textarea } from '../../../components/shadcn/ui/textarea.tsx';
import { Switch } from '../../../components/shadcn/ui/switch.tsx';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '../../../components/shadcn/ui/field.tsx';
import { type TaskFormValues } from '../model/task-form/tasks-form.types.ts';
import { taskFormSchema } from '../model/task-form/tasks-form.schema.ts';
import {
    getTaskPriorityOptions,
    getTaskStatusOptions,
} from '../model/task-form/tasks-form.constants.ts';
import { TagsSelector } from '../../../components/tags-selector.tsx';
import { SelectInput } from '../../../components/select/select-input.tsx';
import {
    getTaskPrioritySelectConfig,
    getTaskStatusSelectConfig,
} from '../model/task-form/tasks-form.configs.ts';
import { buildTaskFormDefaultValues } from '../helpers/buildTaskFormDefaultValues.ts';

interface TaskFormProps {
    initialValues?: TaskFormValues;
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
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="task-form-title">
                                {t('form.title', { ns: 'tasks' })}
                            </FieldLabel>
                            <Input
                                {...field}
                                id="task-form-title"
                                placeholder={t('form.titlePlaceholder', { ns: 'tasks' })}
                                aria-invalid={fieldState.invalid}
                                aria-label="type"
                            />
                            <FieldDescription>
                                {t('form.titleDescription', { ns: 'tasks' })}
                            </FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="task-form-description">
                                {t('form.description', { ns: 'tasks' })}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="task-form-description"
                                placeholder={t('form.descriptionPlaceholder', { ns: 'tasks' })}
                                rows={5}
                                aria-invalid={fieldState.invalid}
                                aria-label="type"
                            />
                            <FieldDescription>
                                {t('form.descriptionDescription', { ns: 'tasks' })}
                            </FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
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
                    <Controller
                        name="deadline"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="task-form-deadline">
                                    {t('form.deadline', { ns: 'tasks' })}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="task-form-deadline"
                                    type="date"
                                    aria-invalid={fieldState.invalid}
                                    aria-label="type"
                                />
                                <FieldDescription>
                                    {t('form.deadlineDescription', { ns: 'tasks' })}
                                </FieldDescription>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="assigneeName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="task-form-assignee">
                                    {t('form.assignee', { ns: 'tasks' })}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="task-form-assignee"
                                    placeholder={t('form.assigneePlaceholder', { ns: 'tasks' })}
                                    aria-invalid={fieldState.invalid}
                                    aria-label="type"
                                />
                                <FieldDescription>
                                    {t('form.assigneeDescription', { ns: 'tasks' })}
                                </FieldDescription>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
                <TagsSelector form={form} />
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
