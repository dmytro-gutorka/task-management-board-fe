import { router } from '../../../app/routes/routes.tsx';
import { TASKS_ROUTES } from '../../constants/routes/tasks.routes.ts';
import type { AppError, HandleErrorOptions } from './model/error.types.ts';
import { removeAccessToken } from '../auth/auth.token-helpers.ts';
import { normalizeError } from './model/helpers/normalize-error.ts';
import { AppErrorCodes } from './model/error.constants.ts';
import { logger } from '../logger.ts';
import { toast } from 'sonner';

export const handleError = (
    error: unknown,
    options: HandleErrorOptions = { redirectTo: TASKS_ROUTES.TASKS_PAGE },
): AppError => {
    const { showToast = true, log = true, logoutOnUnauthorized = false } = options;

    const appError = normalizeError(error);

    if (appError.code === AppErrorCodes.unauthorized && logoutOnUnauthorized) {
        removeAccessToken();
        void router.navigate(options.redirectTo, { replace: true });
    }

    if (showToast) toast.error(appError.message);

    if (log) logger.error('[App Error]:', appError);

    return appError;
};
