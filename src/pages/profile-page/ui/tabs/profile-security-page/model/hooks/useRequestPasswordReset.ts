import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAsyncAction } from '../../../../../../../shared/hooks/useAsyncAction.ts';
import { AuthApiService } from '../../../../../../../shared/infrastructure/auth/auth.api-service.ts';

export function useRequestPasswordReset() {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const requestPasswordResetRequest = useCallback(
        async () => await AuthApiService.requestPasswordReset(),
        [],
    );

    const { execute, isLoading: isRequesting } = useAsyncAction(requestPasswordResetRequest);

    async function requestPasswordReset() {
        const result = await execute();

        if (!result.ok) return;

        setIsSuccess(result.ok);
        toast.success('Password reset link generated');
    }

    return {
        isRequesting,
        isSuccess,
        requestPasswordReset,
    };
}
