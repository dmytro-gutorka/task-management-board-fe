import type { FromPathLocationState } from '../../../types/common.ts';
import type { LoginFormValues } from '../auth.schema.ts';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../app/routes/common/routes.constants.ts';
import { handleError } from '../../../lib/errors/utils/handle-error.ts';
import { AuthApiService } from '../auth-api.service.ts';
import { setAccessToken } from '../auth-token.helpers.ts';
import { LoginForm } from './ui/login-form.tsx';

export function LoginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    async function handleSubmit(values: LoginFormValues) {
        const state = location.state as FromPathLocationState | null;
        const from = state?.from?.pathname ?? ROUTES.TASKS_PAGE;

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
                    Do not have an account?
                    <Link
                        to={ROUTES.REGISTRATION_PAGE}
                        className="pl-[1ch] font-medium text-primary"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
}
