import { useState, useCallback, useEffect } from 'react';
import type { User } from '../../../modules/users/api/user-api.types-domain.ts';
import { getAccessToken } from '../../../infrastructure/auth/auth.token-helpers.ts';
import { UserApiService } from '../../../modules/users/api/user-api.service.ts';

export function useCurrentUser(setIsAuthenticated: (isAuthenticated: boolean) => void) {
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(() => Boolean(getAccessToken()));

    const fetchCurrentUser = useCallback(
        async (signal?: AbortSignal) => {
            try {
                setIsUserLoading(true);

                const currentUser = await UserApiService.getMe(signal);

                setUser(currentUser);
                setIsAuthenticated(true);

                return currentUser;
            } catch {
                setUser(null);
                setIsAuthenticated(false);

                return null;
            } finally {
                setIsUserLoading(false);
            }
        },
        [setIsAuthenticated],
    );

    useEffect(() => {
        if (!getAccessToken()) {
            setIsUserLoading(false);
            return;
        }

        const controller = new AbortController();
        void fetchCurrentUser(controller.signal);

        return () => controller.abort();
    }, [fetchCurrentUser]);

    return { user, isUserLoading, fetchCurrentUser, setUser };
}
