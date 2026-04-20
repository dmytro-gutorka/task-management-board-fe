import type { EnvParser } from '@/app/env/env-types/common.ts';

export function getEnv<T>(envKey: string, envParser: EnvParser<T>, fallback?: T): T {
    const envValue = import.meta.env[envKey];

    if (envValue === undefined || envValue === null || envValue === '') {
        if (fallback !== undefined) return fallback;

        throw new Error(`Missing environment variable ${envKey}`);
    }

    return envParser(envValue);
}
