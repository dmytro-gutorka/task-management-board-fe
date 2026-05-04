import { router } from '../../../app/routes/routes.tsx';
import { ROUTES } from '../../constants/routes.constants.ts';
import type { AppError, HandleErrorOptions } from './model/error.types.ts';
import { removeAccessToken } from '../auth/auth.token-helpers.ts';
import { normalizeError } from './model/helpers/normalize-error.ts';
import { AppErrorCodes } from './model/error.constants.ts';
import { logger } from '../logger.ts';
import { toast } from 'sonner';

export const handleError = (error: unknown, options: HandleErrorOptions = {}): AppError => {
    const { showToast = true, log = true, logoutOnUnauthorized = false } = options;

    const appError = normalizeError(error);

    if (appError.code === AppErrorCodes.unauthorized && logoutOnUnauthorized) {
        removeAccessToken();
        void router.navigate(ROUTES.LOGIN_PAGE, { replace: true });
    }

    if (showToast) toast.error(appError.message);

    if (log) logger.error('[App Error]:', appError);

    return appError;
};
