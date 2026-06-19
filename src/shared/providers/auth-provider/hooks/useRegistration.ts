import { useState } from 'react';
import { AuthApiService } from '../../../infrastructure/auth/auth.api-service.ts';
import { setAccessToken } from '../../../infrastructure/auth/auth.token-helpers.ts';
import type {
    RegisterStepOneValues,
    RegisterStepTwoValues,
} from '../../../infrastructure/auth/auth.schema.ts';
import { handleError } from '../../../infrastructure/errors/handle-error.ts';
import {
    LOCAL_STORAGE_BOOLEANS,
    LOCAL_STORAGE_PROFILE_KEYS,
} from '../../../infrastructure/local-storage/model/local-storage.constants.ts';
import { UserApiService } from '../../../modules/users/user-api.service.ts';
import type { Nullable } from '../../../types/common.ts';
import type { User } from '../../../modules/users/user-api.types-domain.ts';

export function useRegistration(
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    fetchCurrentUser: () => Promise<Nullable<User>>,
) {
    const [step, setStep] = useState<1 | 2>(1);
    const [isLoading, setIsLoading] = useState(false);

    async function registrationStepOne(values: RegisterStepOneValues) {
        try {
            setIsLoading(true);

            const response = await AuthApiService.signUp({
                email: values.email,
                password: values.password,
            });

            setAccessToken(response.accessToken);
            setIsAuthenticated(true);
            await fetchCurrentUser();

            setStep(2);
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function registrationStepTwo(values: RegisterStepTwoValues) {
        try {
            setIsLoading(true);

            const payload = {
                name: values.name?.trim() || undefined,
                surname: values.surname?.trim() || undefined,
                birthday: values.birthday || undefined,
            };

            const hasData = Object.values(payload).some((value) => value !== undefined);

            if (!hasData) {
                localStorage.setItem(
                    LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED,
                    LOCAL_STORAGE_BOOLEANS.TRUE,
                );
                return true;
            }

            await UserApiService.updateMe(payload);

            return true;
        } catch (error: unknown) {
            handleError(error);
            return false;
        } finally {
            setStep(1);
            setIsLoading(false);
        }
    }

    return {
        step,
        setStep,
        isLoading,
        registrationStepOne,
        registrationStepTwo,
    };
}
