import { useEffect, useState } from 'react';

import { PageLoaderOverlay } from '@/shared/components/PageLoaderOverlay';
import { handleError } from '@/shared/infrastructure/errors/handle-error';
import { UserApiService } from '@/shared/modules/users/user-api.service';
import type { User } from '@/shared/modules/users/user-api.types';

import type { ProfileFormValues } from '../../model/profile.schema';
import { ProfileForm } from './profile-form';

export function ProfileTab() {
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isUserUpdating, setIsUserUpdating] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

    // ПЕРЕНСТИ ВСЕ В PAGE PROFILE COM P!!!!!!!!!!!!

    useEffect(() => {
        async function loadUser() {
            try {
                setIsUserLoading(true);

                const currentUser = await UserApiService.getMe();

                setUser(currentUser);
            } catch (error) {
                handleError(error);
            } finally {
                setIsUserLoading(false);
            }
        }

        void loadUser();
    }, []);

    async function handleSubmit(values: ProfileFormValues) {
        try {
            setIsUserUpdating(true);
            setSubmitError(null);
            setIsSubmitSuccess(false);

            const updatedUser = await UserApiService.updateMe({
                name: values.name.trim(),
                surname: values.surname.trim(),
                birthday: values.birthday,
            });

            setUser(updatedUser);
            setIsSubmitSuccess(true);
        } catch (error) {
            setSubmitError('Failed to update profile. Please try again.');
            handleError(error);
        } finally {
            setIsUserUpdating(false);
        }
    }

    if (isUserLoading) {
        return <PageLoaderOverlay label="Loading profile..." />;
    }

    if (!user) {
        return (
            <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                Failed to load profile.
            </div>
        );
    }

    return (
        <ProfileForm
            user={user}
            isSubmitting={isUserUpdating}
            submitError={submitError}
            isSubmitSuccess={isSubmitSuccess}
            onSubmit={handleSubmit}
        />
    );
}
