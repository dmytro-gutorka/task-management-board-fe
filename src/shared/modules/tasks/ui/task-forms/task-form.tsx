import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
    taskPriorityOptions,
    taskStatusOptions,
} from '@/shared/modules/tasks/model/task-form/tasks-form.constants.ts';
import { TagsSelector } from '@/shared/components/tags-selector.tsx';
import { SelectInput } from '@/shared/components/select/select-input.tsx';
import {
    taskPrioritySelectConfig,
    taskStatusSelectConfig,
} from '@/shared/modules/tasks/model/task-form/tasks-form.configs.ts';
import { buildTaskFormDefaultValues } from '@/shared/modules/tasks/helpers/buildTaskFormDefaultValues.ts';

interface TaskFormProps {
    initialValues: TaskFormValues;
    onSubmit: (values: TaskFormValues) => void | Promise<void>;
    formId: string;
}

export function TaskForm({ initialValues, onSubmit, formId }: TaskFormProps) {
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
                            <FieldLabel htmlFor="task-form-title">Title</FieldLabel>
                            <Input
                                {...field}
                                id="task-form-title"
                                placeholder="Enter task title"
                                aria-invalid={fieldState.invalid}
                                aria-label="type"
                            />
                            <FieldDescription>Short and clear task title.</FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="task-form-description">Description</FieldLabel>
                            <Textarea
                                {...field}
                                id="task-form-description"
                                placeholder="Describe the task"
                                rows={5}
                                aria-invalid={fieldState.invalid}
                                aria-label="type"
                            />
                            <FieldDescription>
                                Add useful context for the assignee.
                            </FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <SelectInput
                        form={form}
                        selectConfig={taskStatusSelectConfig}
                        selectOptions={taskStatusOptions}
                    />

                    <SelectInput
                        form={form}
                        selectConfig={taskPrioritySelectConfig}
                        selectOptions={taskPriorityOptions}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Controller
                        name="deadline"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="task-form-deadline">Deadline</FieldLabel>
                                <Input
                                    {...field}
                                    id="task-form-deadline"
                                    type="date"
                                    aria-invalid={fieldState.invalid}
                                    aria-label="type"
                                />
                                <FieldDescription>
                                    Leave empty if there is no deadline.
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
                                <FieldLabel htmlFor="task-form-assignee">Assignee</FieldLabel>
                                <Input
                                    {...field}
                                    id="task-form-assignee"
                                    placeholder="Assignee name"
                                    aria-invalid={fieldState.invalid}
                                    aria-label="type"
                                />
                                <FieldDescription>Optional task owner.</FieldDescription>
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
                                <FieldLabel>Private task</FieldLabel>
                                <FieldDescription>
                                    Restrict visibility of this task.
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
