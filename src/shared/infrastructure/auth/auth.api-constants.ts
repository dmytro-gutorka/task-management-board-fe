export const ACCESS_TOKEN_KEY = 'accessToken';
export const AUTH_BASE_SUBPATH = '/auth';

export const AUTH_API_ROUTES = {
    REFRESH: `${AUTH_BASE_SUBPATH}/refresh`,
    REGISTRATION: `${AUTH_BASE_SUBPATH}/sign-up`,
    LOGIN: `${AUTH_BASE_SUBPATH}/sign-in`,
    LOGOUT: `${AUTH_BASE_SUBPATH}/sign-out`,

    GOOGLE_LOGIN: `${AUTH_BASE_SUBPATH}/google`,
    GOOGLE_LINK: `${AUTH_BASE_SUBPATH}/google/link`,
    SET_LOCAL_PASSWORD: `${AUTH_BASE_SUBPATH}/local/set-password`,

    PRIMARY_EMAIL_OPTIONS: `${AUTH_BASE_SUBPATH}/primary-email-options`,
    PRIMARY_EMAIL: `${AUTH_BASE_SUBPATH}/primary-email`,

    PASSWORD_RESET_REQUEST: `${AUTH_BASE_SUBPATH}/password-reset/request`,
    PASSWORD_RESET_CONFIRM: `${AUTH_BASE_SUBPATH}/password-reset/confirm`,
};
