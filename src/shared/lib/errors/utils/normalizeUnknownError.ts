import { AppErrorCodes, AppErrorMessages } from '@/shared/lib/errors/error.constants.ts';
import type { AppError } from '@/shared/lib/errors/error.types.ts';

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
