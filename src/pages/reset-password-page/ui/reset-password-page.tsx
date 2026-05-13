import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../shared/providers/auth-provider/auth.provider.tsx';
import { useConfirmPasswordReset } from '../model/hooks/useConfirmPasswordReset.ts';
import type { ResetPasswordFormValues } from '../model/reset-password.types.ts';
import { ResetPasswordForm } from './common/reset-password-form.tsx';
import { ResetPasswordInvalidTokenState } from './common/reset-password-invalid-token-state.tsx';
import { ResetPasswordSuccessState } from './common/reset-password-success-state.tsx';

export function ResetPasswordPage() {
    const { isConfirming, isConfirmSuccess, confirmPasswordReset } = useConfirmPasswordReset();
    const { isAuthenticated } = useAuth();

    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get('token');

    async function handleResetPasswordFormSubmit(values: ResetPasswordFormValues) {
        if (!resetToken) return;

        await confirmPasswordReset(resetToken, values);
    }

    if (!resetToken) {
        return <ResetPasswordInvalidTokenState />;
    }

    if (isConfirmSuccess) {
        return <ResetPasswordSuccessState isAuthenticated={isAuthenticated} />;
    }

    return (
        <ResetPasswordForm isConfirming={isConfirming} onSubmit={handleResetPasswordFormSubmit} />
    );
}
