import type { AvatarUploadAllowedType } from '../avatar-uploader.types.ts';

export function getMimeTypesArrayToString(mimeTypes: Readonly<AvatarUploadAllowedType[]>): string {
    return mimeTypes.map((type) => type.split('/')[1]).join(', ');
}
