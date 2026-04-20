import type { ValueOf } from "@/shared/types/common.ts";
import { type AppErrorCodes, AppErrorMessages } from "@/shared/lib/errors/error.constants.ts";

export type AppErrorCodesT = ValueOf<typeof AppErrorCodes>;
export type AppErrorMessagesT = ValueOf<typeof AppErrorMessages>;

export type ApiErrorResponse = {
    message?: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
};

export type AppError = {
    code: AppErrorCodesT;
    message: string;
    status?: number;
    details?: Record<string, string[]>;
    originalError?: unknown;
};

export type HandleErrorOptions = {
    showToast?: boolean;
    log?: boolean;
    logoutOnUnauthorized?: boolean;
    fallbackMessage?: string;
};
