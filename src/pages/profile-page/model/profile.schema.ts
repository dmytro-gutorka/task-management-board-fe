import { isFuture, isValid, parse } from 'date-fns';
import { z } from 'zod';

export const profileFormSchema = z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    surname: z.string().trim().min(2, 'Surname must be at least 2 characters'),
    birthday: z.string().refine(
        (date) => {
            const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

            return isValid(parsedDate) && !isFuture(parsedDate);
        },
        { message: 'Birthday must not be in the future' },
    ),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
