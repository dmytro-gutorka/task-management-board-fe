import { type ApiErrorResponse, type AppError } from '@/shared/lib/errors/error.types.ts';
import { AxiosError } from 'axios';
import {
    AppErrorCodes,
    AppErrorMessages,
    httpErrorMap,
} from '@/shared/lib/errors/error.constants.ts';

export function normalizeAxiosError(error: AxiosError<ApiErrorResponse>): AppError {
    if (!error.response)
        return {
            code: AppErrorCodes.networkError,
            message: AppErrorMessages.networkError,
            originalError: error,
        };

    const status = error.response?.status;
    const data = error.response?.data;

    if (status && httpErrorMap[status]) {
        const mapped = httpErrorMap[status];

        return {
            code: mapped.code,
            message: data?.message || mapped.message,
            status,
            details: data?.errors,
            originalError: error,
        };
    }

    return {
        code: AppErrorCodes.unknownError,
        message: data?.message || AppErrorMessages.unknownError,
        status,
        details: data?.errors,
        originalError: error,
    };
}
