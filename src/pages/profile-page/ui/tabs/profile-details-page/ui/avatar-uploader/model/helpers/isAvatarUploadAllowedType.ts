import { AVATAR_UPLOAD_ALLOWED_TYPES } from '../avatar-uploader.constants.ts';
import type { AvatarUploadAllowedType } from '../avatar-uploader.types.ts';

export function isAvatarUploadAllowedType(type: string): type is AvatarUploadAllowedType {
    return AVATAR_UPLOAD_ALLOWED_TYPES.includes(type as AvatarUploadAllowedType);
}
