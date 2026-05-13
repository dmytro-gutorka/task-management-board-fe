import { useCallback, useState } from 'react';
import { useAsyncAction } from '../../../../shared/hooks/useAsyncAction.ts';
import { toast } from 'sonner';
import { AuthApiService } from '../../../../shared/infrastructure/auth/auth.api-service.ts';
import type { ResetPasswordFormValues } from '../reset-password.types.ts';

export function useConfirmPasswordReset() {
    const [isConfirmSuccess, setIsConfirmSuccess] = useState(false);

    const confirmPasswordResetRequest = useCallback(
        async (token: string, values: ResetPasswordFormValues) => {
            await AuthApiService.confirmPasswordReset({
                token,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            });
        },
        [],
    );

    const { execute, isLoading: isConfirming } = useAsyncAction(confirmPasswordResetRequest);

    async function confirmPasswordReset(token: string, values: ResetPasswordFormValues) {
        setIsConfirmSuccess(false);

        const result = await execute(token, values);

        if (!result.ok) return;

        setIsConfirmSuccess(true);
        toast.success('Password has been reset successfully');
    }

    return {
        isConfirming,
        isConfirmSuccess,
        confirmPasswordReset,
    };
}
