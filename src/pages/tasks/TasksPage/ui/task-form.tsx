import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export function TaskForm({
    mode,
    initialValues,
    isSubmitting = false,
    submitLabel,
    onSubmit,
    onCancel,
}: TaskFormProps) {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: buildTaskFormDefaultValues(initialValues),
        mode: 'onSubmit',
    });

    const { register, control, handleSubmit } = form;
    const errors = form.formState.errors;

    function handleOnSubmit() {
        handleSubmit(onSubmit);
    }

    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <CardTitle>{mode === 'create' ? 'Create task' : 'Edit task'}</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleOnSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Title
                        </label>
                        <Input id="title" placeholder="Enter task title" {...register('title')} />
                        {errors.title ? (
                            <p className="text-sm text-destructive">{errors.title.message}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            placeholder="Describe the task"
                            rows={5}
                            {...register('description')}
                        />
                        {errors.description ? (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        ) : null}
                    </div>

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
                        <div className="space-y-2">
                            <label htmlFor="deadline" className="text-sm font-medium">
                                Deadline
                            </label>
                            <Input id="deadline" type="date" {...register('deadline')} />
                            {errors.deadline ? (
                                <p className="text-sm text-destructive">
                                    {errors.deadline.message}
                                </p>
                            ) : null}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="assigneeName" className="text-sm font-medium">
                                Assignee
                            </label>
                            <Input
                                id="assigneeName"
                                placeholder="Assignee name"
                                {...register('assigneeName')}
                            />
                            {errors.assigneeName ? (
                                <p className="text-sm text-destructive">
                                    {errors.assigneeName.message}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <TagsSelector form={form} />

                    <div className="flex items-center justify-between rounded-xl border p-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Private task</p>
                            <p className="text-sm text-muted-foreground">
                                Restrict visibility of this task.
                            </p>
                        </div>

                        <Controller
                            control={control}
                            name="isPrivate"
                            render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        {onCancel ? (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        ) : null}

                        <Button type="submit" disabled={isSubmitting}>
                            {submitLabel ?? (mode === 'create' ? 'Create task' : 'Save changes')}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
