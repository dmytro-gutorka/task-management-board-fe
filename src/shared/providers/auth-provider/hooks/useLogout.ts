import { useState } from 'react';
import { toast } from 'sonner';
import { AuthApiService } from '../../../infrastructure/auth/auth.api-service.ts';
import { removeAccessToken } from '../../../infrastructure/auth/auth.token-helpers.ts';
import { LOCAL_STORAGE_PROFILE_KEYS } from '../../../infrastructure/local-storage/model/local-storage.constants.ts';
import { PROFILE_TOAST_REMINDER_ID } from '../../../modules/profile-toast-reminder/model/profile-toast-reminder.constants.ts';
import type { Nullable } from '../../../types/common.ts';
import type { User } from '../../../modules/users/api/user-api.types-domain.ts';

export function useLogout(
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    setUser: (user: Nullable<User>) => void,
) {
    const [isLoading, setIsLoading] = useState(false);

    async function logout() {
        try {
            setIsLoading(true);

            await AuthApiService.signOut();
        } finally {
            localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED);
            localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW);

            removeAccessToken();
            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);

            toast.dismiss(PROFILE_TOAST_REMINDER_ID);
        }
    }

    return {
        isLoading,
        logout,
    };
}
