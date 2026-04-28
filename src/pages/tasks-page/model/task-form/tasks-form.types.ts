import {
    type TaskPriority,
    type TaskStatus,
} from '@/pages/tasks-page/model/task-card/task-card.types';
import { taskFormSchema } from '@/pages/tasks-page/model/task-form/tasks-form.schema';
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
