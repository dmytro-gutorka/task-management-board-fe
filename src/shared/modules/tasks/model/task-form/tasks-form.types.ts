import {
    type TaskPriority,
    type TaskStatus,
} from '@/shared/modules/tasks/model/task-card/task-card.types.ts';
import { taskFormSchema } from '@/shared/modules/tasks/model/task-form/tasks-form.schema.ts';
import { type z } from 'zod';

export type TaskFormInitialValues = {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: string;
    assigneeName: string;
    isPrivate: boolean;
    tags: string[];
};

export type TaskFormValues = z.infer<typeof taskFormSchema>;
