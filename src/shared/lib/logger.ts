import { env } from '@/app/env/env.ts';

const isEnabled = env.enableConsoleLogs;

export const logger = {
    log: isEnabled ? console.log : () => {},
    warn: isEnabled ? console.warn : () => {},
    debug: isEnabled ? console.debug : () => {},
    error: console.error,
};
