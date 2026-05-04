import { useState } from 'react';
import { AuthApiService } from '../../../infrastructure/auth/auth.api-service.ts';
import { setAccessToken } from '../../../infrastructure/auth/auth.token-helpers.ts';
import type { LoginFormValues } from '../../../infrastructure/auth/auth.schema.ts';

export function useLogin(setIsAuthenticated: (isAuthenticated: boolean) => void) {
    const [isLoading, setIsLoading] = useState(false);

    async function login(values: LoginFormValues) {
        try {
            setIsLoading(true);

            const response = await AuthApiService.signIn(values);

            setAccessToken(response.accessToken);
            setIsAuthenticated(true);

            return true;
        } catch {
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
