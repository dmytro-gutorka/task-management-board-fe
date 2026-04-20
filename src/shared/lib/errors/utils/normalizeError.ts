import type { ApiErrorResponse, AppError } from '@/shared/lib/errors/error.types.ts';
import { normalizeUnknownError } from '@/shared/lib/errors/utils/normalizeUnknownError.ts';
import { normalizeAxiosError } from '@/shared/lib/errors/utils/normalizeAxiosError.ts';
import axios from 'axios';
import { AppErrorCodes, AppErrorMessages } from '@/shared/lib/errors/error.constants';

export function normalizeError(error: unknown): AppError {
    if (!error)
        return {
            code: AppErrorCodes.unknownError,
            message: AppErrorMessages.unknownError,
        };

    if (axios.isAxiosError<ApiErrorResponse>(error)) return normalizeAxiosError(error);

    return normalizeUnknownError(error);
}
