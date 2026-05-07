import { useTranslation } from 'react-i18next';
import type { LoginFormValues } from '../../../shared/infrastructure/auth/auth.schema.ts';
import { useAuth } from '../../../shared/providers/auth-provider/auth.provider.tsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes.constants.ts';
import type { FromPathLocationState } from '../../../shared/types/common.ts';
import { LoginForm } from './common/login-form.tsx';

export function LoginPage() {
    const { t } = useTranslation(['auth']);
    const { isLoginLoading, login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    async function handleSubmit(values: LoginFormValues) {
        const isSuccess = await login(values);

        if (!isSuccess) return;

        const state = location.state as FromPathLocationState | null;
        const from = state?.from?.pathname ?? ROUTES.TASKS_PAGE;

        void navigate(from, { replace: true });
    }

    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4">
                <LoginForm isSubmitting={isLoginLoading} onSubmit={handleSubmit} />

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
