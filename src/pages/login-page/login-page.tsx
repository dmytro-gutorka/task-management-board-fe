import { useTranslation } from 'react-i18next';
import type { LocationState } from '../../shared/types/common.ts';
import type { LoginFormValues } from '../../shared/modules/auth/auth.schema.ts';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes/common/routes.constants.ts';
import { handleError } from '../../shared/lib/errors/utils/handle-error.ts';
import { AuthApiService } from '../../shared/modules/auth/auth-api.service.ts';
import { setAccessToken } from '../../shared/modules/auth/auth-token.helpers.ts';
import { LoginForm } from './ui/login-form.tsx';

export function LoginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { t } = useTranslation(['auth']);
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as LocationState | null;
    const from = state?.from?.pathname ?? ROUTES.TASKS_PAGE;

    async function handleSubmit(values: LoginFormValues) {
        try {
            setIsSubmitting(true);

            const response = await AuthApiService.signIn(values);

            setAccessToken(response.accessToken);

            void navigate(from, { replace: true });
        } catch (error: unknown) {
            handleError(error, {
                logoutOnUnauthorized: false,
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4">
                <LoginForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />

                <p className="text-center text-sm text-muted-foreground">
                    {t('login.form-labels.have-account', { ns: 'auth' })}
                    <Link
                        to={ROUTES.REGISTRATION_PAGE}
                        className="pl-[1ch] font-medium text-primary"
                    >
                        {t('login.form-labels.register-link', { ns: 'auth' })}
                    </Link>
                </p>
            </div>
        </main>
    );
}
