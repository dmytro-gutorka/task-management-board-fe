import { httpClient } from '../../api/httpClient.ts';
import { API_ROUTES } from './auth-api.constants.ts';
import type { AuthResponse, SignInPayload, SignUpPayload } from './auth-api.types.ts';

export const AuthApiService = {
    async signIn(payload: SignInPayload) {
        const { data } = await httpClient.post<AuthResponse>(API_ROUTES.LOGIN, payload);
        return data;
    },

    async signUp(payload: SignUpPayload) {
        const { data } = await httpClient.post<AuthResponse>(API_ROUTES.REGISTRATION, payload);
        return data;
    },

    async signOut() {
        await httpClient.post(API_ROUTES.LOGOUT);
    },

    async refresh() {
        const { data } = await httpClient.get<AuthResponse>(API_ROUTES.REFRESH);
        return data;
    },
};
