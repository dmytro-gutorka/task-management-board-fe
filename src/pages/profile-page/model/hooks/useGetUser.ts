import { type Dispatch, type SetStateAction, useCallback, useEffect } from 'react';
import { useAsyncAction } from '../../../../shared/hooks/useAsyncAction.ts';
import { UserApiService } from '../../../../shared/modules/users/user-api.service.ts';
import type { User } from '../../../../shared/modules/users/user-api.types-domain.ts';

export function useGetUser(setUser: Dispatch<SetStateAction<User>>) {
    const getUserRequest = useCallback((signal: AbortSignal) => UserApiService.getMe(signal), []);

    const { execute, isLoading } = useAsyncAction(getUserRequest);

    useEffect(() => {
        const controller = new AbortController();

        async function getUser() {
            const user = await execute(controller.signal);

            if (!user || controller.signal.aborted) return;

            setUser(user);
        }

        void getUser();

        return () => controller.abort();
    }, [execute, setUser]);

    return { isUserLoading: isLoading };
}
