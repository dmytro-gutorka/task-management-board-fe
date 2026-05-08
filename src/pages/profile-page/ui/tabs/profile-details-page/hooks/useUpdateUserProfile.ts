import { type Dispatch, type SetStateAction, useState } from 'react';
import { handleError } from '../../../../../../shared/infrastructure/errors/handle-error.ts';
import { UserApiService } from '../../../../../../shared/modules/users/user-api.service.ts';
import type { User } from '../../../../../../shared/modules/users/user-api.types-domain.ts';
import type { ProfileFormValues } from '../../../../model/profile.schema.ts';

export function useUpdateUserProfile(setUser: Dispatch<SetStateAction<User>>) {
    const [isUserUpdating, setIsUserUpdating] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

    async function handleSubmit(values: ProfileFormValues) {
        try {
            setIsUserUpdating(true);
            setIsSubmitSuccess(false);

            const updatedUser = await UserApiService.updateMe({
                name: values.name.trim(),
                surname: values.surname.trim(),
                birthday: values.birthday,
            });

            setUser(updatedUser);
            setIsSubmitSuccess(true);
        } catch (error) {
            handleError(error);
        } finally {
            setIsUserUpdating(false);
        }
    }

    return {
        isUserUpdating,
        isSubmitSuccess,
        handleSubmit,
    };
}
