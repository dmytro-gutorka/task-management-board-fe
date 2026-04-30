import axios, { AxiosError, type AxiosResponse } from 'axios';
import { env } from '@/app/env/env';
import { ACCESS_TOKEN_KEY } from '../modules/auth/auth-api.constants.ts';

export const httpClient = axios.create({
    baseURL: env.serverUrl,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

httpClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        return Promise.reject(error);
    },
);
