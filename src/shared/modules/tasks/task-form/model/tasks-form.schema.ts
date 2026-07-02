import { z } from 'zod';
import { TASK_PRIORITY, TASK_STATUS } from '../../common/model/task.constants.ts';

const dateStringSchema = z
    .string()
    .trim()
    .nullish()
    .refine((value) => {
        if (!value) return true;

        const date = new Date(value);

        return !isNaN(date.getTime());
    }, 'Invalid date format');

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
    deadline: dateStringSchema.optional(),
    isPrivate: z.boolean(),

    latitude: z.number().min(-90).max(90).nullable(),
    longitude: z.number().min(-180).max(180).nullable(),
});
