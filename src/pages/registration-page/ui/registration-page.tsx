import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthButton } from '../../../shared/components/google-auth-button.tsx';
import { GENERAL_ROUTES } from '../../../shared/constants/routes/general.routes.ts';
import { TASKS_ROUTES } from '../../../shared/constants/routes/tasks.routes.ts';
import type { RegisterStepTwoValues } from '../../../shared/infrastructure/auth/auth.schema.ts';
import {
    LOCAL_STORAGE_BOOLEANS,
    LOCAL_STORAGE_PROFILE_KEYS,
} from '../../../shared/infrastructure/local-storage/model/local-storage.constants.ts';
import { useAuth } from '../../../shared/providers/auth-provider/auth.provider.tsx';
import { RegisterStepOneForm } from './common/register-step-one-form.tsx';
import { RegisterStepTwoForm } from './common/register-step-two-form.tsx';

export function RegisterPage() {
    const { t } = useTranslation(['auth']);
    const {
        step,
        setStep,
        registrationStepOne,
        registrationStepTwo,
        isRegistrationLoading,
        loginWithGoogle,
    } = useAuth();

    const navigate = useNavigate();

    async function handleRegistrationStepTwo(values: RegisterStepTwoValues) {
        const isSuccess = await registrationStepTwo(values);

        if (!isSuccess) return;
        setStep(1);

        void navigate(GENERAL_ROUTES.HOME, { replace: true });
    }

    function handleSkip() {
        setStep(1);

        localStorage.setItem(
            LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED,
            LOCAL_STORAGE_BOOLEANS.TRUE,
        );

        void navigate(GENERAL_ROUTES.HOME, { replace: true });
    }

    async function handleGoogleCredential(credential: string) {
        const isSuccess = await loginWithGoogle(credential);

        if (!isSuccess) return;

        void navigate(TASKS_ROUTES.TASKS_PAGE, { replace: true });
    }

    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <div className="max-w-full min-w-1/4 space-y-4">
                {step === 1 ? (
                    <RegisterStepOneForm
                        isSubmitting={isRegistrationLoading}
                        onSubmit={registrationStepOne}
                    />
                ) : (
                    <RegisterStepTwoForm
                        isSubmitting={isRegistrationLoading}
                        onSubmit={handleRegistrationStepTwo}
                        onSkip={handleSkip}
                    />
                )}
                <p className="text-center text-sm text-muted-foreground">
                    {t('register.form-labels.common.have-account', { ns: 'auth' })}
                    <Link
                        to={GENERAL_ROUTES.LOGIN_PAGE}
                        className="pl-[1ch] font-medium text-primary"
                    >
                        {t('register.form-labels.common.login-link', { ns: 'auth' })}
                    </Link>
                </p>

                <div className="flex justify-center">
                    <GoogleAuthButton onCredential={handleGoogleCredential} text="signup_with" />
                </div>
            </div>
        </main>
    );
}
