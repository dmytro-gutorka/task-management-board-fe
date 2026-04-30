export const APP_LANGUAGE = {
    EN: 'en',
    UK: 'uk',
} as const;

export type AppLanguage = (typeof APP_LANGUAGE)[keyof typeof APP_LANGUAGE];

export const DEFAULT_LANGUAGE: AppLanguage = APP_LANGUAGE.EN;

export const LANGUAGE_STORAGE_KEY = 'task-board-language';

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
