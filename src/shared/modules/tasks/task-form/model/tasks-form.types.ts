import { type TaskPriority, type TaskStatus } from '../../task-card/model/task-card.types.ts';
import { taskFormSchema } from './tasks-form.schema.ts';
import { type z } from 'zod';
import type { Nullable } from '../../../../types/common.ts';

export type TaskFormInitialValues = {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: string;
    isPrivate: boolean;
    latitude: Nullable<number>;
    longitude: Nullable<number>;
};

export type TaskFormValues = z.infer<typeof taskFormSchema>;
