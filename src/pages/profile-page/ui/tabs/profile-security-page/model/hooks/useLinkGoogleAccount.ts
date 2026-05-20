import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAsyncAction } from '../../../../../../../shared/hooks/useAsyncAction.ts';
import { AuthApiService } from '../../../../../../../shared/infrastructure/auth/auth.api-service.ts';

export function useLinkGoogleAccount() {
    const [isSuccess, setIsSuccess] = useState(false);

    const linkGoogleAccountRequest = useCallback(
        async (credential: string) => await AuthApiService.linkGoogleAccount({ credential }),
        [],
    );

    const { execute, isLoading: isLinking } = useAsyncAction(linkGoogleAccountRequest);

    async function linkGoogleAccount(credential: string) {
        const result = await execute(credential);

        if (!result.ok) return;

        setIsSuccess(true);
        toast.success(result.data.message || 'Google account linked successfully');
    }

    return {
        isLinking,
        isSuccess,
        linkGoogleAccount,
    };
}
