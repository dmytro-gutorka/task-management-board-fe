import {
    type TaskPriority,
    type TaskStatus,
} from '@/pages/tasks/TasksPage/model/task-card/task-card.types';
import { z } from 'zod';
import { taskFormSchema } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.schema';

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
