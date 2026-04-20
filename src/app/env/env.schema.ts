import { z } from 'zod';

export const envSchema = z.object({
    VITE_SERVER_URL: z.string().default('http://localhost:3000'),
    VITE_APP_NAME: z.string().min(1).default('Taskify'),
    VITE_SERVER_TIMEOUT: z.coerce.number().positive().default(10000),
    VITE_ENABLE_CONSOLE_LOGS: z.coerce.boolean().default(true),
});
