import { z } from 'zod';
import { envSchema } from '@/app/env/env.schema.ts';

export type EnvParser<T> = (value: string) => T;
export type AppEnv = z.infer<typeof envSchema>;
