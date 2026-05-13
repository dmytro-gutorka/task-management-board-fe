import type { z } from 'zod';
import { resetPasswordSchema } from './reset-password.schema.ts';

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
