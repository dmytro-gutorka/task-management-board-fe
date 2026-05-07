import { PageLoaderOverlay } from '@/shared/components/PageLoaderOverlay';
import { ProfileForm } from './profile-form';
import type { User } from '../../../../shared/modules/users/user-api.types-domain.ts';
import type { ProfileFormValues } from '../../model/profile.schema';

interface ProfileTabProps {
    user: User | null;
    isUserLoading: boolean;
    isUserUpdating: boolean;
    submitError: string | null;
    isSubmitSuccess: boolean;
    handleSubmit: (values: ProfileFormValues) => Promise<void>;
}

export function ProfileTab({
    user,
    isUserLoading,
    isUserUpdating,
    submitError,
    isSubmitSuccess,
    handleSubmit,
}: ProfileTabProps) {
    return (
        <>
            {isUserLoading && <PageLoaderOverlay label="Loading profile..." />}
            {user && (
                <ProfileForm
                    user={user}
                    isSubmitting={isUserUpdating}
                    submitError={submitError}
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
