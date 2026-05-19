import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { handleError } from '../../../../../../../../../shared/infrastructure/errors/handle-error.ts';
import type { Nullable } from '../../../../../../../../../shared/types/common.ts';
import { AVATAR_DEFAULT_NAME, AVATAR_DEFAULT_TYPE } from '../avatar-uploader.constants.ts';
import { validateAvatarFile } from '../helpers/validateAvatarFile.ts';

export function useImageUploader() {
    const [previewUrl, setPreviewUrl] = useState<Nullable<string>>(null);
    const [croppedFile, setCroppedFile] = useState<Nullable<File>>(null);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [draftImageUrl, setDraftImageUrl] = useState<Nullable<string>>(null);
    const [draftFileName, setDraftFileName] = useState(AVATAR_DEFAULT_NAME);
    const [draftFileType, setDraftFileType] = useState(AVATAR_DEFAULT_TYPE);
    const inputRef = useRef<Nullable<HTMLInputElement>>(null);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (inputRef.current) inputRef.current.value = '';

        if (!file) return;

        const validationError = validateAvatarFile(file);
        if (validationError) {
            handleError(validationError);
            return;
        }

        if (draftImageUrl) URL.revokeObjectURL(draftImageUrl);

        setDraftFileName(file.name);
        setDraftFileType(file.type);
        setDraftImageUrl(URL.createObjectURL(file));
        setIsCropOpen(true);
    }

    function handleCropCancel() {
        if (draftImageUrl) URL.revokeObjectURL(draftImageUrl);

        setDraftImageUrl(null);
        setIsCropOpen(false);
    }

    function handleCropApply(file: File) {
        if (previewUrl) URL.revokeObjectURL(previewUrl);

        setCroppedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setIsCropOpen(false);

        if (draftImageUrl) URL.revokeObjectURL(draftImageUrl);
        setDraftImageUrl(null);
    }

    function handleCancelSelection() {
        if (previewUrl) URL.revokeObjectURL(previewUrl);

        setPreviewUrl(null);
        setCroppedFile(null);
    }

    useEffect(() => {
        return () => {
            if (draftImageUrl) URL.revokeObjectURL(draftImageUrl);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [draftImageUrl, previewUrl]);

    return {
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
    };
}
