import { createContext, type ReactNode, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ROUTES } from '../../../app/routes/common/routes.constants.ts';
import { handleError } from '../../lib/errors/utils/handle-error.ts';
import type { LocationState, Nullable } from '../../types/common.ts';
import { LOCAL_STORAGE_PROFILE_KEYS } from '../local-storage/model/local-storage.constants.ts';
import { AuthApiService } from './auth-api.service.ts';
import { getAccessToken, removeAccessToken, setAccessToken } from './auth-token.helpers.ts';
import type { LoginFormValues } from './auth.schema.ts';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (values: LoginFormValues) => Promise<void>;
    logout: () => Promise<void>;
    isSubmitting: boolean;
    isLoginSubmitting: boolean;
}

const AuthContext = createContext<Nullable<AuthContextType>>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAccessToken()));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

    async function login(values: LoginFormValues) {
        try {
            setIsLoginSubmitting(true);

            const response = await AuthApiService.signIn(values);

            setAccessToken(response.accessToken);
            setIsAuthenticated(true);
        } catch (error: unknown) {
            handleError(error, {
                logoutOnUnauthorized: false,
            });
        } finally {
            setIsLoginSubmitting(false);
        }
    }

    async function logout() {
        try {
            setIsSubmitting(true);
            await AuthApiService.signOut();
        } catch (error: unknown) {
            handleError(error);
        } finally {
            removeAccessToken();
            setIsAuthenticated(false);

            localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED);
            localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW);
            toast.dismiss('profile-reminder');
        }
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, isSubmitting, isLoginSubmitting }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
