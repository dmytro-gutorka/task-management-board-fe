import { useState } from 'react';
import { PageLoaderOverlay } from '../../../../../shared/components/PageLoaderOverlay.tsx';
import { useGetUser } from './hooks/useGetUser.ts';
import { useUpdateUserProfile } from './hooks/useUpdateUserProfile.ts';
import { ProfileForm } from './ui/profile-form.tsx';
import type { User } from '../../../../../shared/modules/users/user-api.types-domain.ts';

export function ProfileDetailsPage() {
    const [user, setUser] = useState<User | null>(null);

    const { isUserLoading } = useGetUser(setUser);
    const { isUserUpdating, isSubmitSuccess, handleSubmit } = useUpdateUserProfile(setUser);

    return (
        <>
            {isUserLoading && <PageLoaderOverlay label="Loading profile..." />}
            {user && (
                <ProfileForm
                    user={user}
                    isSubmitting={isUserUpdating}
                    isSubmitSuccess={isSubmitSuccess}
                    onSubmit={handleSubmit}
                />
            )}
            {!user && (
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                    Failed to load profile.
                </div>
            )}
        </>
    );
}
