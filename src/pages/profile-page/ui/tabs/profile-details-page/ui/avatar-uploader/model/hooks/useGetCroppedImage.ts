import { useState } from 'react';
import type { Area } from 'react-easy-crop';
import type { Nullable } from '../../../../../../../../../shared/types/common.ts';
import { getCroppedImageFile } from '../helpers/getCroppedImageFile.ts';

export function useGetCroppedImage(
    imageSrc: Nullable<string>,
    fileName: string,
    fileType: string,
    onApply: (file: File) => void,
) {
    const [isCropping, setIsCropping] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Nullable<Area>>(null);

    async function handleApply() {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            setIsCropping(true);
            const croppedFile = await getCroppedImageFile(
                imageSrc,
                croppedAreaPixels,
                fileName,
                fileType,
            );

            onApply(croppedFile);
        } finally {
            setIsCropping(false);
        }
    }

    return {
        isCropping,
        croppedAreaPixels,
        setCroppedAreaPixels,
        handleApply,
    };
}
