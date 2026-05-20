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

export interface MessageResponse {
    message: string;
}

export interface ConfirmPasswordResetPayload {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface SetLocalPasswordPayload {
    password: string;
    confirmPassword: string;
}

export type PasswordResetRequestResponse = MessageResponse;

export interface ConfirmPasswordResetPayload {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export type PasswordResetConfirmResponse = MessageResponse;

export interface GoogleAuthPayload {
    credential: string;
}

export interface PrimaryEmailOption {
    email: string;
    providers: string[];
    isPrimary: boolean;
}

export interface PrimaryEmailOptionsResponse {
    primaryEmail: string;
    emails: PrimaryEmailOption[];
}

export interface UpdatePrimaryEmailPayload {
    email: string;
}

export interface UpdatePrimaryEmailResponse extends MessageResponse {
    primaryEmail: string;
}
