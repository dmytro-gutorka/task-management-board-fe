import { useState } from 'react';
import { PageLoaderOverlay } from '../../../../../shared/components/PageLoaderOverlay.tsx';
import { useGetUser } from './model/hooks/useGetUser.ts';
import { useGetCroppedImage } from './ui/avatar-uploader/model/hooks/useGetCroppedImage.ts';
import { useUpdateUserProfile } from './model/hooks/useUpdateUserProfile.ts';
import { useImageUploader } from './ui/avatar-uploader/model/hooks/useImageUploader.ts';
import { useUploadUserAvatar } from './ui/avatar-uploader/model/hooks/useUploadUserAvatar.ts';
import { AvatarCropDialog } from './ui/avatar-uploader/ui/avatar-crop-dialog.tsx';
import { AvatarUploaderCard } from './ui/avatar-uploader/ui/avatar-uploader-card.tsx';
import { ProfileForm } from './ui/profile-form.tsx';
import type { User } from '../../../../../shared/modules/users/api/user-api.types-domain.ts';
import { ProfileReadOnlyInfo } from './ui/profile-readonly-info.tsx';

export function ProfileDetailsPage() {
    const [user, setUser] = useState<User | null>(null);

    const { isUserLoading } = useGetUser(setUser);
    const { isUserUpdating, isSubmitSuccess, handleSubmit } = useUpdateUserProfile(setUser);
    const { isAvatarUploading, handleUploadAvatar } = useUploadUserAvatar(setUser);

    const {
        croppedFile,
        previewUrl,
        isCropOpen,
        draftImageUrl,
        draftFileName,
        draftFileType,
        inputRef,
        handleCancelSelection,
        handleFileChange,
        handleCropCancel,
        handleCropApply,
    } = useImageUploader();

    const { isCropping, handleApply, setCroppedAreaPixels, croppedAreaPixels } = useGetCroppedImage(
        draftImageUrl,
        draftFileName,
        draftFileType,
        handleCropApply,
    );

    async function handleSave() {
        if (!croppedFile) return;

        await handleUploadAvatar(croppedFile);
        handleCancelSelection();
    }

    return (
        <>
            {isUserLoading && <PageLoaderOverlay label="Loading profile..." />}
            {user && (
                <div className="flex flex-col gap-6">
                    <AvatarUploaderCard
                        user={user}
                        hasUnsavedAvatar={Boolean(croppedFile)}
                        displayedAvatarUrl={previewUrl ?? user?.avatarUrl}
                        inputRef={inputRef}
                        isAvatarUploading={isAvatarUploading}
                        onCancelSelection={handleCancelSelection}
                        onSave={handleSave}
                        onFileChange={handleFileChange}
                    />

                    <ProfileForm
                        user={user}
                        isSubmitting={isUserUpdating}
                        isSubmitSuccess={isSubmitSuccess}
                        onSubmit={handleSubmit}
                    />
                    <ProfileReadOnlyInfo user={user} />
                </div>
            )}
            {!user && !isUserLoading && (
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                    Failed to load profile.
                </div>
            )}
            <AvatarCropDialog
                imageSrc={draftImageUrl}
                isOpen={isCropOpen}
                onCancel={handleCropCancel}
                isCropping={isCropping}
                croppedAreaPixels={croppedAreaPixels}
                setCroppedAreaPixels={setCroppedAreaPixels}
                onApply={handleApply}
            />
        </>
    );
}
