import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { snackbarService } from '@/shared/components/snakbar/snackbar.service.ts';
import type { SnackbarState } from '@/shared/components/snakbar/snackbar.types.ts';

export function useSnackbarSubscription(setState: Dispatch<SetStateAction<SnackbarState>>) {
    useEffect(() => {
        snackbarService.register(({ message, variant = 'info' }) => {
            setState({
                open: true,
                message,
                variant,
            });
        });

        return () => {
            snackbarService.unregister();
        };
    }, []);
}
