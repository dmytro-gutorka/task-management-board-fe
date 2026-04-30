import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/components/shadcn/ui/input.tsx';
import { Textarea } from '@/shared/components/shadcn/ui/textarea.tsx';
import { Switch } from '@/shared/components/shadcn/ui/switch.tsx';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/shared/components/shadcn/ui/field.tsx';
import { type TaskFormValues } from '@/shared/modules/tasks/model/task-form/tasks-form.types.ts';
import { taskFormSchema } from '@/shared/modules/tasks/model/task-form/tasks-form.schema.ts';
import {
    getTaskPriorityOptions,
    getTaskStatusOptions,
} from '@/shared/modules/tasks/model/task-form/tasks-form.constants.ts';
import { TagsSelector } from '@/shared/components/tags-selector.tsx';
import { SelectInput } from '@/shared/components/select/select-input.tsx';
import {
    getTaskPrioritySelectConfig,
    getTaskStatusSelectConfig,
} from '@/shared/modules/tasks/model/task-form/tasks-form.configs.ts';
import { buildTaskFormDefaultValues } from '@/shared/modules/tasks/helpers/buildTaskFormDefaultValues.ts';

interface TaskFormProps {
    initialValues?: TaskFormValues;
    onSubmit: (values: TaskFormValues) => void | Promise<void>;
    formId: string;
}

export function TaskForm({ initialValues, onSubmit, formId }: TaskFormProps) {
    const { t } = useTranslation();
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
                                {t('tasks.form.title')}
                            </FieldLabel>
                            <Input
                                {...field}
                                id="task-form-title"
                                placeholder={t('tasks.form.titlePlaceholder')}
                                aria-invalid={fieldState.invalid}
                                aria-label="type"
                            />
                            <FieldDescription>{t('tasks.form.titleDescription')}</FieldDescription>
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
                                {t('tasks.form.description')}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="task-form-description"
                                placeholder={t('tasks.form.descriptionPlaceholder')}
                                rows={5}
                                aria-invalid={fieldState.invalid}
                                aria-label="type"
                            />
                            <FieldDescription>
                                {t('tasks.form.descriptionDescription')}
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
                                    {t('tasks.form.deadline')}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="task-form-deadline"
                                    type="date"
                                    aria-invalid={fieldState.invalid}
                                    aria-label="type"
                                />
                                <FieldDescription>
                                    {t('tasks.form.deadlineDescription')}
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
                                    {t('tasks.form.assignee')}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="task-form-assignee"
                                    placeholder={t('tasks.form.assigneePlaceholder')}
                                    aria-invalid={fieldState.invalid}
                                    aria-label="type"
                                />
                                <FieldDescription>
                                    {t('tasks.form.assigneeDescription')}
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
                                <FieldLabel>{t('tasks.form.isPrivate')}</FieldLabel>
                                <FieldDescription>
                                    {t('tasks.form.isPrivateDescription')}
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
