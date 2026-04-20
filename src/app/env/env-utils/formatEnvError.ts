import type { ZodError } from 'zod';

export function formatEnvError(error: ZodError): string {
    return error.issues
        .map((issue) => {
            const path = issue.path.join('.');
            return `${path}: ${issue.message}`;
        })
        .join('\n');
}
