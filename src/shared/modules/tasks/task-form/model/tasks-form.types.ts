import { type TaskPriority, type TaskStatus } from '../../task-card/model/task-card.types.ts';
import { taskFormSchema } from './tasks-form.schema.ts';
import { type z } from 'zod';

export type TaskFormInitialValues = {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline?: string | undefined | null;
    isPrivate: boolean;
};

export type TaskFormValues = z.infer<typeof taskFormSchema>;
