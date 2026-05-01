import { normalizeError } from '@/shared/lib/errors/utils/normalize-error.ts';
import type { AppError, HandleErrorOptions } from '@/shared/lib/errors/error.types.ts';
import { logger } from '@/shared/lib/logger';
import { toast } from 'react-toastify';
import { removeAccessToken } from '../../../modules/auth/auth-token.helpers.ts';

export const handleError = (error: unknown, options: HandleErrorOptions = {}): AppError => {
    const { showToast = true, log = true, logoutOnUnauthorized = true } = options;

    const appError = normalizeError(error);

    if (appError.code === 'UNAUTHORIZED' && logoutOnUnauthorized) {
        removeAccessToken();
    }

    if (showToast) toast.error(appError.message);

    if (log) logger.error('[app error]', appError);

    return appError;
};
