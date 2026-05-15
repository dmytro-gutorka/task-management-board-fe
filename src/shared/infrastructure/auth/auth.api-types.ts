export interface SignUpPayload {
    email: string;
    password: string;
}

export interface SignInPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
}

export interface PasswordResetRequestResponse {
    message: string;
}

export interface ConfirmPasswordResetPayload {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface PasswordResetConfirmResponse {
    message: string;
}
