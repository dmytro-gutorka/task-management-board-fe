import { normalizeError } from '@/shared/lib/errors/utils/normalize-error.ts';
import type { AppError, HandleErrorOptions } from '@/shared/lib/errors/error.types.ts';
import { logger } from '@/shared/lib/logger';

// will be used later
export const handleError = (error: unknown, options: HandleErrorOptions = {}): AppError => {
    const { showToast = true, log = true, logoutOnUnauthorized = true } = options;

    const appError = normalizeError(error);

    if (log) {
        logger.error('[AppError]', appError);
    }

    if (appError.code === 'UNAUTHORIZED' && logoutOnUnauthorized) {
        // AUTH LOGIC (will be replaced later, when I create it)
    }

    if (showToast) {
        // TODO: 2 Implement toast service
        // Since I have deleted BUI, don't have a toast service anymore
    }

    return appError;
};
