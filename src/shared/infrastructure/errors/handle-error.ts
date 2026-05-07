import { router } from '../../../app/routes/routes.tsx';
import { ROUTES } from '../../constants/routes.constants.ts';
import type { AppError, HandleErrorOptions } from './model/error.types.ts';
import { removeAccessToken } from '../auth/auth.token-helpers.ts';
import { normalizeError } from './model/helpers/normalize-error.ts';
import { AppErrorCodes } from './model/error.constants.ts';
import { logger } from '../logger.ts';
import { toast } from 'sonner';

export const handleError = (
    error: unknown,
    options: HandleErrorOptions = { redirectTo: ROUTES.TASKS_PAGE },
): AppError => {
    const { showToast = true, log = true, logoutOnUnauthorized = false } = options;

    const appError = normalizeError(error);

    if (appError.code === AppErrorCodes.unauthorized && logoutOnUnauthorized) {
        removeAccessToken();
        void router.navigate(options.redirectTo, { replace: true });
        // TODO: There is a problem with "router" import from "app" folder.
        //  It is should not be imported this way, but I do not know how to fix it.
    }

    if (showToast) toast.error(appError.message);

    if (log) logger.error('[App Error]:', appError);

    return appError;
};
