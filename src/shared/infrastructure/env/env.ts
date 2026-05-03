import { envSchema } from './model/env.schema.ts';
import { formatEnvError } from './model/helpers/formatEnvError.ts';

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success)
    throw new Error(`Invalid environment variables: \n${formatEnvError(parsedEnv.error)}`);

export const env = {
    serverUrl: parsedEnv.data.VITE_SERVER_URL,
    appName: parsedEnv.data.VITE_APP_NAME,
    serverTimeout: parsedEnv.data.VITE_SERVER_TIMEOUT,
    enableConsoleLogs: parsedEnv.data.VITE_ENABLE_CONSOLE_LOGS,
} as const;
