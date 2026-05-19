import { IMAGE_MIME_TYPES } from '../../../../../../../../shared/constants/common.constants.ts';
import { getMimeTypesArrayToString } from './helpers/getMimeTypesArrayToString.ts';

export const AVATAR_UPLOAD_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const AVATAR_UPLOAD_ALLOWED_TYPES = [
    IMAGE_MIME_TYPES.JPG,
    IMAGE_MIME_TYPES.PNG,
    IMAGE_MIME_TYPES.WEBP,
] as const;

export const AVATAR_UPLOAD_ALLOWED_EXTENSIONS_LABEL = getMimeTypesArrayToString(
    AVATAR_UPLOAD_ALLOWED_TYPES,
);

export const AVATAR_DEFAULT_NAME = 'avatar.png';
export const AVATAR_DEFAULT_TYPE = 'image/png';
