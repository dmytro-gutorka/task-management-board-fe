import { Camera, Loader2, RotateCcw, Upload, X } from 'lucide-react';
import type { ChangeEvent, RefObject } from 'react';
import {
    Alert,
    AlertDescription,
} from '../../../../../../../../shared/components/shadcn/ui/alert.tsx';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '../../../../../../../../shared/components/shadcn/ui/avatar.tsx';
import { Button } from '../../../../../../../../shared/components/shadcn/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../../../../shared/components/shadcn/ui/card.tsx';
import { Input } from '../../../../../../../../shared/components/shadcn/ui/input.tsx';
import type { User } from '../../../../../../../../shared/modules/users/user-api.types-domain.ts';
import type { Nullable } from '../../../../../../../../shared/types/common.ts';
import { AVATAR_UPLOAD_ALLOWED_EXTENSIONS_LABEL } from '../model/avatar-uploader.constants.ts';
import { getInitials } from '../model/helpers/getInitials.ts';

interface AvatarUploaderCardProps {
    user: User;
    displayedAvatarUrl: Nullable<string | undefined>;
    hasUnsavedAvatar: boolean;
    isAvatarUploading: boolean;
    inputRef: RefObject<Nullable<HTMLInputElement>>;
    onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSave: () => Promise<void>;
    onCancelSelection: () => void;
}
export function AvatarUploaderCard({
    user,
    displayedAvatarUrl,
    hasUnsavedAvatar,
    isAvatarUploading,
    inputRef,
    onFileChange,
    onSave,
    onCancelSelection,
}: AvatarUploaderCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>
                    Upload a profile image. The file is saved only after confirmation.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {hasUnsavedAvatar && (
                    <Alert>
                        <AlertDescription>Avatar preview is not saved yet.</AlertDescription>
                    </Alert>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Avatar className="size-24" size="lg">
                        {displayedAvatarUrl && (
                            <AvatarImage src={displayedAvatarUrl} alt="Profile avatar" />
                        )}
                        <AvatarFallback className="text-xl">{getInitials(user)}</AvatarFallback>
                    </Avatar>

                    <div className="space-y-3">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Profile photo</p>
                            <p className="text-sm text-muted-foreground">
                                {AVATAR_UPLOAD_ALLOWED_EXTENSIONS_LABEL}, up to 5MB.
                            </p>
                        </div>

                        <Input
                            ref={inputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            disabled={isAvatarUploading}
                            onClick={(event) => {
                                event.currentTarget.value = '';
                            }}
                            onChange={onFileChange}
                            aria-label="Upload profile photo"
                        />

                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isAvatarUploading}
                                onClick={() => inputRef.current?.click()}
                            >
                                {hasUnsavedAvatar ? (
                                    <RotateCcw className="mr-2 size-4" />
                                ) : (
                                    <Camera className="mr-2 size-4" />
                                )}

                                {hasUnsavedAvatar ? 'Replace' : 'Choose image'}
                            </Button>

                            {hasUnsavedAvatar && (
                                <>
                                    <Button
                                        type="button"
                                        disabled={isAvatarUploading}
                                        onClick={() => void onSave()}
                                    >
                                        {isAvatarUploading ? (
                                            <Loader2 className="mr-2 size-4 animate-spin" />
                                        ) : (
                                            <Upload className="mr-2 size-4" />
                                        )}
                                        Save avatar
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        disabled={isAvatarUploading}
                                        onClick={onCancelSelection}
                                    >
                                        <X className="mr-2 size-4" />
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
