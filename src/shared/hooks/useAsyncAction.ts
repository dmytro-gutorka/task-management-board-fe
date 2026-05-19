import axios from 'axios';
import { useCallback, useState } from 'react';
import { handleError } from '../infrastructure/errors/handle-error.ts';

type AsyncActionResult<Data> = { ok: true; data: Data } | { ok: false };

export function useAsyncAction<Args extends unknown[], Data>(
    action: (...args: Args) => Promise<Data>,
) {
    const [isLoading, setIsLoading] = useState(false);

    const execute = useCallback(
        async (...args: Args): Promise<AsyncActionResult<Data>> => {
            try {
                setIsLoading(true);

                const data = await action(...args);

                return { ok: true, data };
            } catch (error) {
                if (!axios.isCancel(error)) handleError(error);

                return { ok: false };
            } finally {
                setIsLoading(false);
            }
        },
        [action],
    );

    return {
        execute,
        isLoading,
    };
}
