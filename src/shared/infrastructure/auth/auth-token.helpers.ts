import { deleteFromLocalStorage } from '../local-storage/helpers/deleteFromLocalStorage.ts';
import { readFromLocalStorage } from '../local-storage/helpers/readFromLocalStorage.ts';
import { writeToLocalStorage } from '../local-storage/helpers/writeToLocalStorage.ts';
import { ACCESS_TOKEN_KEY } from './auth-api.constants.ts';

export function getAccessToken() {
    return readFromLocalStorage(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
    writeToLocalStorage(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken() {
    deleteFromLocalStorage(ACCESS_TOKEN_KEY);
}

export function isAuthenticated() {
    return Boolean(getAccessToken());
}
