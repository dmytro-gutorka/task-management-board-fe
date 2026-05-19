import type { Area } from 'react-easy-crop';
import { createImage } from './createImage.ts';

export async function getCroppedImageFile(
    imageSrc: string,
    crop: Area,
    fileName: string,
    fileType: string,
): Promise<File> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Could not prepare avatar preview');

    canvas.width = crop.width;
    canvas.height = crop.height;

    context.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height,
    );

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
            if (!result) {
                reject(new Error('Could not crop avatar image'));
                return;
            }

            resolve(result);
        }, fileType);
    });

    return new File([blob], fileName, { type: fileType });
}
