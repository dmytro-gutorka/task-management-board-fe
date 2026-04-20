import { normalizeError } from '@/shared/lib/errors/utils/normalizeError.ts';
import type { AppError, HandleErrorOptions } from '@/shared/lib/errors/error.types.ts';
import { snackbarService } from '@/shared/components/snakbar/snackbar.service.ts';

export const handleError = (error: unknown, options: HandleErrorOptions = {}): AppError => {
    const { showToast = true, log = true, logoutOnUnauthorized = true, fallbackMessage } = options;

    const appError = normalizeError(error);

    if (log) {
        console.error('[AppError]', appError);
    }

    if (appError.code === 'UNAUTHORIZED' && logoutOnUnauthorized) {
        // AUTH LOGIC (will be replaced later, when I create it)
    }

    if (showToast) {
        snackbarService.error(fallbackMessage || appError.message);
    }

    return appError;
};
