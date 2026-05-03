import { deleteFromLocalStorage } from '../local-storage/helpers/deleteFromLocalStorage.ts';
import { ACCESS_TOKEN_KEY } from './auth-api.constants.ts';

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken() {
    deleteFromLocalStorage(ACCESS_TOKEN_KEY);
}

export function isAuthenticated() {
    return Boolean(getAccessToken());
}
