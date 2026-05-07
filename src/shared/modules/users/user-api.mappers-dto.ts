import { format } from 'date-fns';
import type { UpdateMeDto } from './user-api.types-dto.ts';
import type { UpdateMePayload } from './user-api.types-domain.ts';

export function mapUpdateMePayloadToDto(payload: UpdateMePayload): UpdateMeDto {
    return {
        name: payload.name?.trim(),
        surname: payload.surname?.trim(),
        birthday: payload.birthday ? format(payload.birthday, 'yyyy-MM-dd') : null,
    };
}
