import type { ApiErrorResponse, AppError } from "@/shared/lib/errors/error.types.ts";
import axios from "axios";
import {
    AppErrorCodes,
    AppErrorMessages,
    httpErrorMap,
} from "@/shared/lib/errors/error.constants.ts";

export function normalizeAxiosError(error: unknown): AppError | null {
    if (!axios.isAxiosError<ApiErrorResponse>(error)) return null;

    const status = error.response?.status;
    const data = error.response?.data;

    if (!error.response) {
        return {
            code: AppErrorCodes.networkError,
            message: AppErrorMessages.networkError,
            originalError: error,
        };
    }

    if (status && httpErrorMap[status]) {
        const mapped = httpErrorMap[status]!;

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
