import type { SnackbarState } from '@/shared/components/snakbar/snackbar.types.ts';
import { type PropsWithChildren, useState } from 'react';
import { useSnackbarSubscription } from '@/shared/components/snakbar/hooks/useSnackbarSubscription.ts';

const snackStakeInit: SnackbarState = {
    open: false,
    message: '',
    variant: 'info',
};

export function SnackbarProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<SnackbarState>(snackStakeInit);

    useSnackbarSubscription(setState);

    const handleClose = () => {
        setState((prev) => ({
            ...prev,
            open: false,
        }));
    };

    // will be replaced with shadCN later
    return (
        <>
            {children}

            <Snackbar
                open={state.open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={state.variant} variant="filled">
                    {state.message}
                </Alert>
            </Snackbar>
        </>
    );
}
