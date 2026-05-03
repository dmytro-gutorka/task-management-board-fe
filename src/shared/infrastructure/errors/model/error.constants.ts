import type { AppErrorCodesT, AppErrorMessagesT } from './error.types.ts';

const APP_ERRORS = {
    VALIDATION_ERROR: 'validationError',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    NOT_FOUND: 'notFound',
    SERVER_ERROR: 'serverError',
    NETWORK_ERROR: 'networkError',
    UNKNOWN_ERROR: 'unknownError',
} as const;

export const AppErrorCodes = {
    [APP_ERRORS.VALIDATION_ERROR]: 'VALIDATION_ERROR',
    [APP_ERRORS.UNAUTHORIZED]: 'UNAUTHORIZED',
    [APP_ERRORS.FORBIDDEN]: 'FORBIDDEN',
    [APP_ERRORS.NOT_FOUND]: 'NOT_FOUND',
    [APP_ERRORS.SERVER_ERROR]: 'SERVER_ERROR',
    [APP_ERRORS.NETWORK_ERROR]: 'NETWORK_ERROR',
    [APP_ERRORS.UNKNOWN_ERROR]: 'UNKNOWN_ERROR',
} as const;

export const AppErrorMessages = {
    [APP_ERRORS.VALIDATION_ERROR]: 'Validation failed',
    [APP_ERRORS.UNAUTHORIZED]: 'Session expired. Please sign in again.',
    [APP_ERRORS.FORBIDDEN]: 'You do not have access to this action',
    [APP_ERRORS.NOT_FOUND]: 'Requested resource was not found.',
    [APP_ERRORS.SERVER_ERROR]: 'Server error. Please try again later.',
    [APP_ERRORS.NETWORK_ERROR]: 'Network error. Please check your internet connection.',
    [APP_ERRORS.UNKNOWN_ERROR]: 'Something went wrong.',
};

interface AppErrorsMap {
    message: AppErrorMessagesT;
    code: AppErrorCodesT;
}

export const httpErrorMap: Record<number, AppErrorsMap> = {
    400: {
        code: AppErrorCodes.validationError,
        message: AppErrorMessages.validationError,
    },
    401: {
        code: AppErrorCodes.unauthorized,
        message: AppErrorMessages.unauthorized,
    },
    403: {
        code: AppErrorCodes.forbidden,
        message: AppErrorMessages.forbidden,
    },
    404: {
        code: AppErrorCodes.notFound,
        message: AppErrorMessages.notFound,
    },
    422: {
        code: AppErrorCodes.validationError,
        message: AppErrorMessages.validationError,
    },
    500: {
        code: AppErrorCodes.serverError,
        message: AppErrorMessages.serverError,
    },
};
