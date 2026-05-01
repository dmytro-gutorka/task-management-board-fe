import { httpClient } from '../../api/httpClient.ts';
import { USER_ROUTES } from './user-api.constants.ts';
import type { UpdateMePayload, UpdateMeResponse } from './user-api.types.ts';

export const UserApiService = {
    async updateMe(payload: UpdateMePayload) {
        const { data } = await httpClient.patch<UpdateMeResponse>(USER_ROUTES.ME, payload);

        return data;
    },
};
