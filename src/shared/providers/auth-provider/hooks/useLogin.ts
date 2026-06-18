import { useState } from 'react';
import { AuthApiService } from '../../../infrastructure/auth/auth.api-service.ts';
import { setAccessToken } from '../../../infrastructure/auth/auth.token-helpers.ts';
import type { LoginFormValues } from '../../../infrastructure/auth/auth.schema.ts';
import { handleError } from '../../../infrastructure/errors/handle-error.ts';
import type { Nullable } from '../../../types/common.ts';
import type { User } from '../../../modules/users/user-api.types-domain.ts';

export function useLogin(
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    fetchCurrentUser: () => Promise<Nullable<User>>,
) {
    const [isLoading, setIsLoading] = useState(false);

    async function login(values: LoginFormValues) {
        try {
            setIsLoading(true);

            const response = await AuthApiService.signIn(values);

            setAccessToken(response.accessToken);
            setIsAuthenticated(true);

            await fetchCurrentUser();

            return true;
        } catch (error: unknown) {
            handleError(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        login,
    };
}
