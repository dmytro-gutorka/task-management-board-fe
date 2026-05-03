import type { AppError, HandleErrorOptions } from './model/error.types.ts';
import { removeAccessToken } from '../auth/auth-token.helpers.ts';
import { normalizeError } from './model/helpers/normalize-error.ts';
import { AppErrorCodes } from './model/error.constants.ts';
import { logger } from '../logger.ts';
import { toast } from 'sonner';

export const handleError = (error: unknown, options: HandleErrorOptions = {}): AppError => {
    const { showToast = true, log = true, logoutOnUnauthorized = true } = options;

    const appError = normalizeError(error);

    if (appError.code === AppErrorCodes.unauthorized && logoutOnUnauthorized) {
        removeAccessToken();
    }

    if (showToast) toast.error(appError.message);

    if (log) logger.error('[App Error]:', appError);

    return appError;
};
