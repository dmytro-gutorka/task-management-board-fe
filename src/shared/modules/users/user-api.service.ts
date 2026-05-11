import { httpClient } from '../../infrastructure/axios/httpClient.ts';
import { USER_ROUTES } from './user-api.constants.ts';
import type { UserDto } from './user-api.types-dto.ts';
import { mapUserDtoToUser } from './user-api.mappers-domain.ts';
import { mapUpdateMePayloadToDto } from './user-api.mappers-dto.ts';
import type { UpdateMePayload, User } from './user-api.types-domain.ts';

export const UserApiService = {
    async getMe(signal: AbortSignal): Promise<User> {
        const { data } = await httpClient.get<UserDto>(USER_ROUTES.ME, { signal });

        return mapUserDtoToUser(data);
    },

    async updateMe(payload: UpdateMePayload): Promise<User> {
        const dto = mapUpdateMePayloadToDto(payload);

        const { data } = await httpClient.patch<UserDto>(USER_ROUTES.ME, dto);

        return mapUserDtoToUser(data);
    },

    async uploadAvatar(formData: FormData): Promise<User> {
        const { data } = await httpClient.post<UserDto>(USER_ROUTES.ME_AVATAR, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return mapUserDtoToUser(data);
    },
};
