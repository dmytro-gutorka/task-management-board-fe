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

    setStep: (step: 1 | 2) => void;
    step: number;
}

const AuthContext = createContext<Nullable<AuthContextType>>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAccessToken()));

    const { isLoading: isLoginLoading, login } = useLogin(setIsAuthenticated);
    const { isLoading: isLogoutLoading, logout } = useLogout(setIsAuthenticated);
    const { isLoading: isGoogleLoginLoading, loginWithGoogle } = useGoogleLogin(setIsAuthenticated);

    const {
        step,
        setStep,
        isLoading: isRegistrationLoading,
        registrationStepOne,
        registrationStepTwo,
    } = useRegistration(setIsAuthenticated);

    return (
        <AuthContext.Provider
            value={{
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
