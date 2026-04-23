import { z } from 'zod';
import {
    TASK_PRIORITY,
    TASK_STATUS,
} from '@/pages/tasks/TasksPage/model/task-card/task-card.constants';

// TODO 2: Maybe split some rules to separate files for better readability later ?
// TODO 3: Build reusable factory for error-message ZOD rules ?

const dateStringSchema = z
    .string()
    .trim()
    .refine((value) => value === '' || !Number.isNaN(new Date(value).getTime()), 'Invalid date');

export const taskFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required')
        .max(120, 'Title must be at most 120 characters'),
    description: z
        .string()
        .trim()
        .min(1, 'Description is required')
        .max(1000, 'Description must be at most 1000 characters'),

    status: z.enum([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE]),
    priority: z.enum([TASK_PRIORITY.LOW, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.HIGH]),
    deadline: dateStringSchema,
    assigneeName: z.string().trim().max(120, 'Assignee name must be at most 120 characters'),
    isPrivate: z.boolean(),
    tags: z.array(z.string().trim().min(1).max(20)).max(5, 'Max 10 tags'),
});
