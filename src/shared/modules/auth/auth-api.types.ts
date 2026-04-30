export type SignUpPayload = {
    email: string;
    password: string;
};

export type SignInPayload = {
    email: string;
    password: string;
};

export type AuthResponse = {
    accessToken: string;
};
