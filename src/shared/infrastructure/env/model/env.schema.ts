import { z } from 'zod';

export const envSchema = z.object({
    VITE_SERVER_URL: z.string(),
    VITE_APP_NAME: z.string().min(1),
    VITE_SERVER_TIMEOUT: z.coerce.number().positive(),
    VITE_ENABLE_CONSOLE_LOGS: z.coerce.boolean(),
    VITE_GOOGLE_CLIENT_ID: z.string().min(1),
});
