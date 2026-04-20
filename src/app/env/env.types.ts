import { type z } from 'zod';
import { envSchema } from '@/app/env/env.schema.ts';

export type AppEnv = z.infer<typeof envSchema>;
