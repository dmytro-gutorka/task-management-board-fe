import { httpClient } from '../../api/httpClient.ts';
import { API_ROUTES } from './auth-api.constants.ts';
import type { AuthResponse, SignInPayload } from './auth-api.types.ts';

export const AuthApiService = {
    async signIn(payload: SignInPayload): Promise<AuthResponse> {
        const { data } = await httpClient.post<AuthResponse>(API_ROUTES.LOGIN, payload);

        return data;
    },
};
