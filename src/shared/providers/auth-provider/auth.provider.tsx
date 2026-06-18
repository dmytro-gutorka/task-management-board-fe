import type { CredentialResponse } from '@react-oauth/google';
import { createContext, type ReactNode, useContext, useState } from 'react';
import { getAccessToken } from '../../infrastructure/auth/auth.token-helpers.ts';
import { useGoogleLogin } from './hooks/useGoogleLogin.ts';
import { useLogin } from './hooks/useLogin.ts';
import { useLogout } from './hooks/useLogout.ts';
import type { Nullable } from '../../types/common.ts';
import type {
    LoginFormValues,
    RegisterStepOneValues,
    RegisterStepTwoValues,
} from '../../infrastructure/auth/auth.schema.ts';
import { useRegistration } from './hooks/useRegistration.ts';
import type { User } from '../../modules/users/user-api.types-domain.ts';
import { useCurrentUser } from './hooks/useCurrentUser.ts';

interface AuthContextType {
    login: (values: LoginFormValues) => Promise<boolean>;
    loginWithGoogle: (credential: CredentialResponse['credential']) => Promise<boolean>;
    logout: () => Promise<void>;
    registrationStepOne: (values: RegisterStepOneValues) => Promise<void>;
    registrationStepTwo: (values: RegisterStepTwoValues) => Promise<boolean>;
    isRegistrationLoading: boolean;
    isAuthenticated: boolean;
    isLogoutLoading: boolean;
    isLoginLoading: boolean;
    isGoogleLoginLoading: boolean;

    user: Nullable<User>;
    isUserLoading: boolean;
    fetchCurrentUser: () => Promise<Nullable<User>>;
    setUser: (user: Nullable<User>) => void;

    setStep: (step: 1 | 2) => void;
    step: number;
}

const AuthContext = createContext<Nullable<AuthContextType>>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAccessToken()));

    const { user, isUserLoading, fetchCurrentUser, setUser } = useCurrentUser(setIsAuthenticated);
    const { isLoading: isLoginLoading, login } = useLogin(setIsAuthenticated, fetchCurrentUser);
    const { isLoading: isLogoutLoading, logout } = useLogout(setIsAuthenticated, setUser);
    const { isLoading: isGoogleLoginLoading, loginWithGoogle } = useGoogleLogin(
        setIsAuthenticated,
        fetchCurrentUser,
    );

    const {
        step,
        setStep,
        isLoading: isRegistrationLoading,
        registrationStepOne,
        registrationStepTwo,
    } = useRegistration(setIsAuthenticated, fetchCurrentUser);

    return (
        <AuthContext.Provider
            value={{
                user,
                isUserLoading,
                fetchCurrentUser,
                setUser,
                login,
                loginWithGoogle,
                logout,
                registrationStepOne,
                registrationStepTwo,
                isRegistrationLoading,
                isAuthenticated,
                isLoginLoading,
                isGoogleLoginLoading,
                isLogoutLoading,
                setStep,
                step,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth must be used within an AuthProvider');

    return context;
};
