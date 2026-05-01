import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../app/routes/common/routes.constants.ts';
import { handleError } from '../../../../../lib/errors/utils/handle-error.ts';
import { LOCAL_STORAGE_PROFILE_KEYS } from '../../../../local-storage/model/local-storage.constants.ts';
import { ACCESS_TOKEN_KEY } from '../../../auth-api.constants.ts';
import { AuthApiService } from '../../../auth-api.service.ts';
import { removeAccessToken } from '../../../auth-token.helpers.ts';

export function useLogout() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem(ACCESS_TOKEN_KEY),
    );
    const navigate = useNavigate();

    async function handleLogout(): Promise<void> {
        try {
            setIsSubmitting(true);
            await AuthApiService.signOut();
        } catch (error: unknown) {
            handleError(error);
        } finally {
            localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED);
            localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW);

            removeAccessToken();
            setIsSubmitting(false);
            setIsAuthenticated(false);

            void navigate(ROUTES.LOGIN_PAGE, { replace: true });
        }
    }

    return {
        isAuthenticated,
        isSubmitting,
        handleLogout,
    };
}
