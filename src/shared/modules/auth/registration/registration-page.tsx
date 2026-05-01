import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../app/routes/common/routes.constants.ts';
import { handleError } from '../../../lib/errors/utils/handle-error.ts';
import { logger } from '../../../lib/logger.ts';
import { UserApiService } from '../../users/user-api.service.ts';
import { AuthApiService } from '../auth-api.service.ts';
import { getAccessToken, setAccessToken } from '../auth-token.helpers.ts';
import type { RegisterStepOneValues, RegisterStepTwoValues } from '../auth.schema.ts';
import { RegisterStepOneForm } from './ui/register-step-one-form.tsx';
import { RegisterStepTwoForm } from './ui/register-step-two-form.tsx';

export function RegisterPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        localStorage.setItem('profileCompletionSkipped', 'true');

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
                    Already have an account?
                    <Link to={ROUTES.LOGIN_PAGE} className="pl-[1ch] font-medium text-primary">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
}
