import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
    type TaskFormInitialValues,
    type TaskFormValues,
} from '@/pages/tasks/TasksPage/model/task-form/tasks-form.types';
import { taskFormSchema } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.schema';
import {
    taskPriorityOptions,
    taskStatusOptions,
} from '@/pages/tasks/TasksPage/model/task-form/tasks-form.constants';
import { TagsSelector } from '@/shared/components/tags-selector';
import { SelectInput } from '@/shared/components/select/select-input';
import {
    taskPrioritySelectConfig,
    taskStatusSelectConfig,
} from '@/pages/tasks/TasksPage/model/task-form/tasks-form.configs';
import { buildTaskFormDefaultValues } from '@/pages/tasks/TasksPage/model/task-form/utils/buildTaskFormDefaultValues';

interface TaskFormProps {
    mode: 'create' | 'edit';
    initialValues?: Partial<TaskFormInitialValues>;
    isSubmitting?: boolean;
    submitLabel?: string;
    onSubmit: (values: TaskFormValues) => void | Promise<void>;
    onCancel?: () => void;
}

export function TaskForm({ initialValues, onSubmit }: TaskFormProps) {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: buildTaskFormDefaultValues(initialValues),
        mode: 'onSubmit',
    });

    function handleOnSubmit() {
        form.handleSubmit(onSubmit);
    }

    return (
        <form id="task-form" onSubmit={handleOnSubmit}>
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
