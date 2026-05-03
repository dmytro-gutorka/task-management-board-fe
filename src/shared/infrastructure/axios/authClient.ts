import axios from 'axios';
import { env } from '../env/env.ts';

export const authClient = axios.create({
    baseURL: env.serverUrl,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
