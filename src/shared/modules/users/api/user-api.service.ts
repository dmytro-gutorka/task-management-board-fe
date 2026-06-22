import { httpClient } from '../../../infrastructure/axios/httpClient.ts';
import { USER_API_ROUTES } from './user-api.constants.ts';
import type { UserDto, UserListItemDto, UserDetailsDto } from './user-api.types-dto.ts';
import {
    mapUserDtoToUser,
    mapPagePaginatedResponseDto,
    mapUserListItemDtoToUserListItem,
    mapUserDetailsDtoToUserDetails,
} from './user-api.mappers-domain.ts';
import { mapUpdateMePayloadToDto } from './user-api.mappers-dto.ts';
import type {
    UpdateMePayload,
    User,
    UsersListQuery,
    UserListItem,
    UserDetails,
} from './user-api.types-domain.ts';
import type { PermissionRoles } from '../../permissions/model/permissions.types.ts';
import type { PagePaginationResponse } from '../../../types/common.ts';

export const UserApiService = {
    async getMe(signal?: AbortSignal): Promise<User> {
        const { data } = await httpClient.get<UserDto>(USER_API_ROUTES.ME, {
            signal,
        });

        return mapUserDtoToUser(data);
    },

    async updateMe(payload: UpdateMePayload): Promise<User> {
        const dto = mapUpdateMePayloadToDto(payload);

        const { data } = await httpClient.patch<UserDto>(USER_API_ROUTES.ME, dto);

        return mapUserDtoToUser(data);
    },

    async uploadAvatar(formData: FormData): Promise<User> {
        const { data } = await httpClient.post<UserDto>(USER_API_ROUTES.ME_AVATAR, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return mapUserDtoToUser(data);
    },

    async getUsers(
        query: UsersListQuery = {},
        signal?: AbortSignal,
    ): Promise<PagePaginationResponse<UserListItem>> {
        const { data } = await httpClient.get<PagePaginationResponse<UserListItemDto>>(
            USER_API_ROUTES.ROOT,
            {
                signal,
                params: query,
            },
        );

        return mapPagePaginatedResponseDto(data, mapUserListItemDtoToUserListItem);
    },

    async getUserById(id: number | string, signal?: AbortSignal): Promise<UserDetails> {
        const { data } = await httpClient.get<UserDetailsDto>(USER_API_ROUTES.byId(id), { signal });

        return mapUserDetailsDtoToUserDetails(data);
    },

    async updateUserRoles(id: number | string, roles: PermissionRoles[]): Promise<UserDetails> {
        const { data } = await httpClient.put<UserDetailsDto>(USER_API_ROUTES.roles(id), {
            roles,
        });

        return mapUserDetailsDtoToUserDetails(data);
    },
};
