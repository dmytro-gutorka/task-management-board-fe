import { type z } from 'zod';
import { envSchema } from './env.schema.ts';

export type AppEnv = z.infer<typeof envSchema>;
