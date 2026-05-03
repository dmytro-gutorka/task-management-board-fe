import { type ApiErrorResponse, type AppError } from '../error.types.ts';
import { AxiosError } from 'axios';
import { AppErrorCodes, AppErrorMessages, httpErrorMap } from '../error.constants.ts';

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
            details: data?.errors,
            status,
            originalError: error,
        };
    }

    return {
        code: AppErrorCodes.unknownError,
        message: data?.message || AppErrorMessages.unknownError,
        details: data?.errors,
        status,
        originalError: error,
    };
}
