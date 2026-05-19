import { convertBytesToMegaBytes } from '../../../../../../../../../shared/helpers/convertBytesToMegaBytes.ts';
import {
    AVATAR_UPLOAD_ALLOWED_EXTENSIONS_LABEL,
    AVATAR_UPLOAD_MAX_FILE_SIZE_BYTES,
} from '../avatar-uploader.constants.ts';
import { isAvatarUploadAllowedType } from './isAvatarUploadAllowedType.ts';

export function validateAvatarFile(file: File): Error | void {
    if (!isAvatarUploadAllowedType(file.type))
        return new Error(`Unsupported file format. Use ${AVATAR_UPLOAD_ALLOWED_EXTENSIONS_LABEL}.`);

    if (file.size > AVATAR_UPLOAD_MAX_FILE_SIZE_BYTES)
        return new Error(
            `File size exceeds the limit of ${convertBytesToMegaBytes(AVATAR_UPLOAD_MAX_FILE_SIZE_BYTES)} MB.`,
        );

    return;
}
