import { authClient } from '../axios/authClient.ts';
import { httpClient } from '../axios/httpClient.ts';
import { AUTH_API_ROUTES } from './auth.api-constants.ts';
import type {
    AuthResponse,
    ConfirmPasswordResetPayload,
    MessageResponse,
    PasswordResetConfirmResponse,
    PasswordResetRequestResponse,
    SetLocalPasswordPayload,
    SignInPayload,
    SignUpPayload,
    GoogleAuthPayload,
    PrimaryEmailOptionsResponse,
    UpdatePrimaryEmailPayload,
    UpdatePrimaryEmailResponse,
} from './auth.api-types.ts';

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

    async requestPasswordReset() {
        const { data } = await httpClient.post<PasswordResetRequestResponse>(
            AUTH_API_ROUTES.PASSWORD_RESET_REQUEST,
            {},
        );

        return data;
    },

    async confirmPasswordReset(payload: ConfirmPasswordResetPayload) {
        const { data } = await httpClient.post<PasswordResetConfirmResponse>(
            AUTH_API_ROUTES.PASSWORD_RESET_CONFIRM,
            payload,
        );

        return data;
    },

    async signInWithGoogle(payload: GoogleAuthPayload) {
        const { data } = await httpClient.post<AuthResponse>(AUTH_API_ROUTES.GOOGLE_LOGIN, payload);
        return data;
    },

    async linkGoogleAccount(payload: GoogleAuthPayload) {
        const { data } = await httpClient.post<MessageResponse>(
            AUTH_API_ROUTES.GOOGLE_LINK,
            payload,
        );
        return data;
    },

    async setLocalPassword(payload: SetLocalPasswordPayload) {
        const { data } = await httpClient.post<MessageResponse>(
            AUTH_API_ROUTES.SET_LOCAL_PASSWORD,
            payload,
        );
        return data;
    },

    async getPrimaryEmailOptions() {
        const { data } = await httpClient.get<PrimaryEmailOptionsResponse>(
            AUTH_API_ROUTES.PRIMARY_EMAIL_OPTIONS,
        );

        return data;
    },

    async updatePrimaryEmail(payload: UpdatePrimaryEmailPayload) {
        const { data } = await httpClient.patch<UpdatePrimaryEmailResponse>(
            AUTH_API_ROUTES.PRIMARY_EMAIL,
            payload,
        );

        return data;
    },
};
