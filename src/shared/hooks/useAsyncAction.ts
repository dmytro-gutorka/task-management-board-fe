import axios from 'axios';
import { useCallback, useState } from 'react';
import { handleError } from '../infrastructure/errors/handle-error.ts';

export function useAsyncAction<Args extends unknown[], Data>(
    action: (...args: Args) => Promise<Data>,
) {
    const [isLoading, setIsLoading] = useState(false);

    const execute = useCallback(
        async (...args: Args): Promise<Data | null> => {
            try {
                setIsLoading(true);

                return await action(...args);
            } catch (error) {
                if (axios.isCancel(error)) return null;
                handleError(error);

                return null;
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
