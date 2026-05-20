import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAsyncAction } from '../../../../../../../shared/hooks/useAsyncAction.ts';
import { AuthApiService } from '../../../../../../../shared/infrastructure/auth/auth.api-service.ts';
import type { PrimaryEmailOptionsResponse } from '../../../../../../../shared/infrastructure/auth/auth.api-types.ts';

export function usePrimaryEmailOptions() {
    const [primaryEmailOptions, setPrimaryEmailOptions] =
        useState<PrimaryEmailOptionsResponse | null>(null);

    const getPrimaryEmailOptionsRequest = useCallback(
        async (signal?: AbortSignal) => await AuthApiService.getPrimaryEmailOptions(signal),
        [],
    );

    const updatePrimaryEmailRequest = useCallback(
        async (email: string) => await AuthApiService.updatePrimaryEmail({ email }),
        [],
    );

    const { execute: fetchPrimaryEmailOptions, isLoading: isLoadingPrimaryEmailOptions } =
        useAsyncAction(getPrimaryEmailOptionsRequest);

    const { execute: updatePrimaryEmail, isLoading: isUpdatingPrimaryEmail } =
        useAsyncAction(updatePrimaryEmailRequest);

    const refreshPrimaryEmailOptions = useCallback(async () => {
        const result = await fetchPrimaryEmailOptions();

        if (!result.ok) return;

        setPrimaryEmailOptions(result.data);
    }, [fetchPrimaryEmailOptions]);

    async function handlePrimaryEmailUpdate(email: string) {
        const result = await updatePrimaryEmail(email);

        if (!result.ok) return;

        setPrimaryEmailOptions((currentOptions) => {
            if (!currentOptions) return currentOptions;

            return {
                primaryEmail: result.data.primaryEmail,
                emails: currentOptions.emails.map((emailOption) => ({
                    ...emailOption,
                    isPrimary: emailOption.email === result.data.primaryEmail,
                })),
            };
        });

        toast.success(result.data.message || 'Primary email updated successfully');
    }

    useEffect(() => {
        const controller = new AbortController();

        async function loadPrimaryEmailOptions() {
            const result = await fetchPrimaryEmailOptions(controller.signal);

            if (!result.ok) return;

            setPrimaryEmailOptions(result.data);
        }

        void loadPrimaryEmailOptions();

        return () => controller.abort();
    }, [fetchPrimaryEmailOptions]);

    return {
        primaryEmailOptions,
        isLoadingPrimaryEmailOptions,
        isUpdatingPrimaryEmail,
        updatePrimaryEmail: handlePrimaryEmailUpdate,
        refreshPrimaryEmailOptions,
    };
}
