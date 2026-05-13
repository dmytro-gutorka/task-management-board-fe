import { type Dispatch, type SetStateAction, useCallback } from 'react';
import { useAsyncAction } from '../../../../../../../../../shared/hooks/useAsyncAction.ts';
import { UserApiService } from '../../../../../../../../../shared/modules/users/user-api.service.ts';
import type { User } from '../../../../../../../../../shared/modules/users/user-api.types-domain.ts';

export function useUploadUserAvatar(setUser: Dispatch<SetStateAction<User | null>>) {
    const uploadAvatarRequest = useCallback(
        (file: FormData) => UserApiService.uploadAvatar(file),
        [],
    );

    const { isLoading, execute } = useAsyncAction(uploadAvatarRequest);

    async function handleUploadAvatar(file: File) {
        const formData = new FormData();
        formData.append('avatar', file);

        const result = await execute(formData);

        if (!result.ok) return;

        setUser(result.data);
    }

    return {
        isAvatarUploading: isLoading,
        handleUploadAvatar,
    };
}
