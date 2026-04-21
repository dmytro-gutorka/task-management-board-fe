import axios, { AxiosError, type AxiosResponse } from 'axios';
import { env } from '@/app/env/env';

export const httpClient = axios.create({
    baseURL: env.serverUrl,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        return Promise.reject(error);
    },
);
