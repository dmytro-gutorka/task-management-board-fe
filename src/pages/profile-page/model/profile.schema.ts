import { z } from 'zod';

export const profileFormSchema = z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    surname: z.string().trim().min(2, 'Surname must be at least 2 characters'),
    birthday: z.string().min(1, 'Birthday is required'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
