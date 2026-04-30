import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY, type AppLanguage } from './i18n.constants';

export function useChangeLanguage() {
    const { i18n } = useTranslation();

    const changeLanguage = useCallback(
        async (language: AppLanguage) => {
            await i18n.changeLanguage(language);
            localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        },
        [i18n],
    );

    return {
        language: i18n.language as AppLanguage,
        changeLanguage,
    };
}
