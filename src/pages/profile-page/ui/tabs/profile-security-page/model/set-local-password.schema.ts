import { z } from 'zod';

export const setLocalPasswordSchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((values) => values.password === values.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

export type SetLocalPasswordFormValues = z.infer<typeof setLocalPasswordSchema>;
