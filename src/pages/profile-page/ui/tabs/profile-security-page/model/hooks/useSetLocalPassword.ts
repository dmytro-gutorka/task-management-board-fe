import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAsyncAction } from '../../../../../../../shared/hooks/useAsyncAction.ts';
import { AuthApiService } from '../../../../../../../shared/infrastructure/auth/auth.api-service.ts';
import type { SetLocalPasswordFormValues } from '../set-local-password.schema.ts';

export function useSetLocalPassword() {
    const [isSuccess, setIsSuccess] = useState(false);

    const setLocalPasswordRequest = useCallback(
        async (values: SetLocalPasswordFormValues) =>
            await AuthApiService.setLocalPassword({
                password: values.password,
                confirmPassword: values.confirmPassword,
            }),
        [],
    );

    const { execute, isLoading: isSettingPassword } = useAsyncAction(setLocalPasswordRequest);

    async function setLocalPassword(values: SetLocalPasswordFormValues) {
        const result = await execute(values);

        if (!result.ok) return;

        setIsSuccess(true);
        toast.success(result.data.message || 'Local password was set successfully');
    }

    return {
        isSettingPassword,
        isSuccess,
        setLocalPassword,
    };
}
