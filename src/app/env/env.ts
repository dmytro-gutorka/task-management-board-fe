import {getEnv} from "@/app/env/env-utils/getEnv.ts";
import {parseString} from "@/app/env/env-parsers/parseString.ts";
import {parseBoolean} from "@/app/env/env-parsers/parseBoolean.ts";
import {parseNumber} from "@/app/env/env-parsers/parseNumber.ts";


export const env = {
    serverUrl: getEnv('VITE_SERVER_URL', parseString, 'http://localhost:3000'),
    appName: getEnv('VITE_APP_NAME', parseString, 'Taskify'),
    apiTimeout: getEnv('VITE_SERVER_TIMEOUT', parseNumber, 10000),
    enableConsoleLogs: getEnv('VITE_ENABLE_CONSOLE_LOGS', parseBoolean, true),
} as const;