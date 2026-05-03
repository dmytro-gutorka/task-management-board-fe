import axios, { AxiosError, type AxiosResponse } from 'axios';
import { env } from './env/env.ts';
import { handleError } from './errors/handle-error.ts';
import { ACCESS_TOKEN_KEY } from './auth/auth-api.constants.ts';
import { AuthApiService } from './auth/auth-api.service.ts';
import { setAccessToken } from './auth/auth-token.helpers.ts';

export const httpClient = axios.create({
    baseURL: env.serverUrl,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

httpClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest) {
            try {
                const response = await AuthApiService.refresh();

                setAccessToken(response.accessToken);
                originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

                return httpClient(originalRequest);
            } catch (error) {
                handleError(error);
            }
        }
        return Promise.reject(error);
    },
);
