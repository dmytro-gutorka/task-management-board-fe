import { httpClient } from '../../infrastructure/axios/httpClient.ts';
import { USER_ROUTES } from './user-api.constants.ts';
import type { GetMeResponse, UpdateMePayload, UpdateMeResponse } from './user-api.types.ts';

export const UserApiService = {
    async getMe() {
        const { data } = await httpClient.get<GetMeResponse>(USER_ROUTES.ME);

        return data;
    },

    async updateMe(payload: UpdateMePayload) {
        const { data } = await httpClient.patch<UpdateMeResponse>(USER_ROUTES.ME, payload);

        return data;
    },
};
