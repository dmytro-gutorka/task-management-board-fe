import { authClient } from '../axios/authClient.ts';
import { httpClient } from '../axios/httpClient.ts';
import { AUTH_API_ROUTES } from './auth.api-constants.ts';
import type { AuthResponse, SignInPayload, SignUpPayload } from './auth.api-types.ts';

export const AuthApiService = {
    async signIn(payload: SignInPayload) {
        const { data } = await httpClient.post<AuthResponse>(AUTH_API_ROUTES.LOGIN, payload);
        return data;
    },

    async signUp(payload: SignUpPayload) {
        const { data } = await httpClient.post<AuthResponse>(AUTH_API_ROUTES.REGISTRATION, payload);
        return data;
    },

    async signOut() {
        await httpClient.get(AUTH_API_ROUTES.LOGOUT);
    },

    async refresh() {
        const { data } = await authClient.get<AuthResponse>(AUTH_API_ROUTES.REFRESH);
        return data;
    },
};
