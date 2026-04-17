import {ApiErrors} from "@/shared/lib/errors/error.constants.ts";
import type {ValueOf} from "@/shared/types/common.ts";

export type ApiErrorsTypes = ValueOf<typeof ApiErrors>

export type ApiErrorResponse = {
    message?: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
};

export type ApiError = {
    code: ApiErrorsTypes;
    message: string;
    status?: number;
    details?: Record<string, string[]>;
    originalError?: unknown;
};