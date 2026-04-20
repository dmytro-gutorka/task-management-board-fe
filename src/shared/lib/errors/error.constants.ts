import type { AppErrorCodesT, AppErrorMessagesT } from '@/shared/lib/errors/error.types.ts';

const AppErrorInterface = {
    validationError: 'validationError',
    unauthorized: 'unauthorized',
    forbidden: 'forbidden',
    notFound: 'notFound',
    serverError: 'serverError',
    networkError: 'networkError',
    unknownError: 'unknownError',
} as const;

export const AppErrorCodes = {
    [AppErrorInterface.validationError]: 'VALIDATION_ERROR',
    [AppErrorInterface.unauthorized]: 'UNAUTHORIZED',
    [AppErrorInterface.forbidden]: 'FORBIDDEN',
    [AppErrorInterface.notFound]: 'NOT_FOUND',
    [AppErrorInterface.serverError]: 'SERVER_ERROR',
    [AppErrorInterface.networkError]: 'NETWORK_ERROR',
    [AppErrorInterface.unknownError]: 'UNKNOWN_ERROR',
} as const;

export const AppErrorMessages = {
    [AppErrorInterface.validationError]: 'Validation failed',
    [AppErrorInterface.unauthorized]: 'Session expired. Please sign in again.',
    [AppErrorInterface.forbidden]: 'You do not have access to this action',
    [AppErrorInterface.notFound]: 'Requested resource was not found.',
    [AppErrorInterface.serverError]: 'Server error. Please try again later.',
    [AppErrorInterface.networkError]: 'Network error. Please check your internet connection.',
    [AppErrorInterface.unknownError]: 'Something went wrong.',
};

interface IAppErrorMap {
    message: AppErrorMessagesT;
    code: AppErrorCodesT;
}

export const httpErrorMap: Record<number, IAppErrorMap> = {
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
