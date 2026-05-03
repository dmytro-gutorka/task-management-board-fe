import { useTranslation } from 'react-i18next';
import { useAuth } from '../../shared/modules/auth/auth.provider.tsx';
import type { LocationState } from '../../shared/types/common.ts';
import type { LoginFormValues } from '../../shared/modules/auth/auth.schema.ts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes/common/routes.constants.ts';
import { LoginForm } from './ui/login-form.tsx';

export function LoginPage() {
    const { t } = useTranslation(['auth']);

    const location = useLocation();
    const navigate = useNavigate();

    const { isLoginSubmitting, login } = useAuth();

    async function handleSubmit(values: LoginFormValues) {
        const state = location.state as LocationState | null;
        const from = state?.from?.pathname ?? ROUTES.TASKS_PAGE;

        await login(values);

        void navigate(from, { replace: true });
    }

    console.log(isLoginSubmitting);
    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4">
                <LoginForm isSubmitting={isLoginSubmitting} onSubmit={handleSubmit} />

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
