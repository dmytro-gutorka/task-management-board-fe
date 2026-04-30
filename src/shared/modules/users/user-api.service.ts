import { USER_ROUTES } from './user-api.constants.ts';

export const UserApiService = {
    async updateMe(payload: UpdateMePayload) {
        const { data } = await apiClient.patch(USER_ROUTES.ME, payload);
        return data;
    },
};
