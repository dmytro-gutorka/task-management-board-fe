import axios, { AxiosError, type AxiosResponse } from 'axios';
import { normalizeError } from '@/shared/lib/errors/utils/normalizeError';

export const httpClient = axios.create({
    baseURL: import.meta.env.VIPE_SERVER_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const appError = normalizeError(error);

        return Promise.reject(error);
    },
);
