import type { AppLanguage } from './i18n.types.ts';

export const APP_LANGUAGE = {
    EN: 'en',
    UK: 'uk',
} as const;

export const languageOptions = [
    {
        value: APP_LANGUAGE.EN,
        label: 'English',
    },
    {
        value: APP_LANGUAGE.UK,
        label: 'Українська',
    },
] as const;

export const DEFAULT_LANGUAGE: AppLanguage = APP_LANGUAGE.EN;
export const LANGUAGE_STORAGE_KEY = 'task-board-language';
