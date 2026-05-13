import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAsyncAction } from '../../../../../../../shared/hooks/useAsyncAction.ts';
import { AuthApiService } from '../../../../../../../shared/infrastructure/auth/auth.api-service.ts';
import type { PasswordResetRequestResponse } from '../../../../../../../shared/infrastructure/auth/auth.api-types.ts';

export function useRequestPasswordReset() {
    const [response, setResponse] = useState<PasswordResetRequestResponse | null>(null);

    const requestPasswordResetRequest = useCallback(
        async () => await AuthApiService.requestPasswordReset(),
        [],
    );

    const { execute, isLoading: isRequesting } = useAsyncAction(requestPasswordResetRequest);

    async function requestPasswordReset() {
        const result = await execute();

        if (!result.ok) return;

        setResponse(result.data);
        toast.success('Password reset link generated');
    }

    return {
        isRequesting,
        response,
        requestPasswordReset,
    };
}
