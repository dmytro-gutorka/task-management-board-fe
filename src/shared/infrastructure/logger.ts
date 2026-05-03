import { env } from './env/env.ts';

/* eslint-disable no-console */

const isEnabled = env.enableConsoleLogs;

export const logger = {
    log: isEnabled ? console.log : () => {},
    warn: isEnabled ? console.warn : () => {},
    debug: isEnabled ? console.debug : () => {},
    error: console.error,
};
