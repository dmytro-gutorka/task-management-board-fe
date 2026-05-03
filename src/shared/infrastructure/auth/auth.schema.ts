import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
});

export const registerStepOneSchema = z
    .object({
        email: z.email().min(1, 'Email is required'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((values) => values.password === values.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

export const registerStepTwoSchema = z.object({
    name: z.string().trim().optional(),
    surname: z.string().trim().optional(),
    birthday: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterStepOneValues = z.infer<typeof registerStepOneSchema>;
export type RegisterStepTwoValues = z.infer<typeof registerStepTwoSchema>;
