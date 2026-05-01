import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes/common/routes.constants.ts';
import { handleError } from '../../shared/lib/errors/utils/handle-error.ts';
import { logger } from '../../shared/lib/logger.ts';
import { LOCAL_STORAGE_PROFILE_KEYS } from '../../shared/modules/local-storage/model/local-storage.constants.ts';
import { UserApiService } from '../../shared/modules/users/user-api.service.ts';
import { AuthApiService } from '../../shared/modules/auth/auth-api.service.ts';
import { getAccessToken, setAccessToken } from '../../shared/modules/auth/auth-token.helpers.ts';
import type {
    RegisterStepOneValues,
    RegisterStepTwoValues,
} from '../../shared/modules/auth/auth.schema.ts';
import { RegisterStepOneForm } from './ui/register-step-one-form.tsx';
import { RegisterStepTwoForm } from './ui/register-step-two-form.tsx';

export function RegisterPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { t } = useTranslation(['auth']);

    const navigate = useNavigate();

    async function handleStepOneSubmit(values: RegisterStepOneValues) {
        try {
            setIsSubmitting(true);

            const response = await AuthApiService.signUp({
                email: values.email,
                password: values.password,
            });

            setAccessToken(response.accessToken);
            setStep(2);
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleStepTwoSubmit(values: RegisterStepTwoValues) {
        try {
            setIsSubmitting(true);

            await UserApiService.updateMe({
                name: values.name?.trim() || undefined,
                surname: values.surname?.trim() || undefined,
                birthday: values.birthday || undefined,
            });

            logger.debug(getAccessToken());
            void navigate(ROUTES.HOME, { replace: true });
        } catch (error: unknown) {
            handleError(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleSkip() {
        localStorage.setItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED, 'true');

        void navigate(ROUTES.HOME, { replace: true });
    }

    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4">
                {step === 1 ? (
                    <RegisterStepOneForm
                        onSubmit={handleStepOneSubmit}
                        isSubmitting={isSubmitting}
                    />
                ) : (
                    <RegisterStepTwoForm
                        onSubmit={handleStepTwoSubmit}
                        onSkip={handleSkip}
                        isSubmitting={isSubmitting}
                    />
                )}

                <p className="text-center text-sm text-muted-foreground">
                    {t('register.form-labels.common.have-account', { ns: 'auth' })}
                    <Link to={ROUTES.LOGIN_PAGE} className="pl-[1ch] font-medium text-primary">
                        {t('register.form-labels.common.login-link', { ns: 'auth' })}
                    </Link>
                </p>
            </div>
        </main>
    );
}
