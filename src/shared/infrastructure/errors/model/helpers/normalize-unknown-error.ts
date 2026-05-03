import { AppErrorCodes, AppErrorMessages } from '../error.constants.ts';
import type { AppError } from '../error.types.ts';

export function normalizeUnknownError(error: unknown): AppError {
    if (error instanceof Error)
        return {
            code: AppErrorCodes.unknownError,
            message: error.message || AppErrorMessages.unknownError,
            originalError: error,
        };

    return {
        code: AppErrorCodes.unknownError,
        message: AppErrorMessages.unknownError,
        originalError: error,
    };
}
