import { useState } from 'react';
import { AuthApiService } from '../../../infrastructure/auth/auth.api-service.ts';
import { setAccessToken } from '../../../infrastructure/auth/auth.token-helpers.ts';
import { handleError } from '../../../infrastructure/errors/handle-error.ts';

export function useGoogleLogin(setIsAuthenticated: (isAuthenticated: boolean) => void) {
    const [isLoading, setIsLoading] = useState(false);

    async function loginWithGoogle(credential: string): Promise<boolean> {
        try {
            setIsLoading(true);

            const response = await AuthApiService.signInWithGoogle({ credential });

            setAccessToken(response.accessToken);
            setIsAuthenticated(true);

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
        loginWithGoogle,
    };
}
