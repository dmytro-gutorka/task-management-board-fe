import type { ApiErrorResponse, AppError } from '../error.types.ts';
import { normalizeUnknownError } from './normalize-unknown-error.ts';
import { normalizeAxiosError } from './normalize-axios-error.ts';
import axios from 'axios';
import { AppErrorCodes, AppErrorMessages } from '../error.constants.ts';

export function normalizeError(error: unknown): AppError {
    if (!error)
        return {
            code: AppErrorCodes.unknownError,
            message: AppErrorMessages.unknownError,
        };

    if (axios.isAxiosError<ApiErrorResponse>(error)) return normalizeAxiosError(error);

    return normalizeUnknownError(error);
}
