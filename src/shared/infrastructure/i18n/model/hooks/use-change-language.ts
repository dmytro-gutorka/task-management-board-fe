import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { writeToLocalStorage } from '../../../local-storage/helpers/writeToLocalStorage.ts';
import { LANGUAGE_STORAGE_KEY } from '../i18n.constants.ts';
import type { AppLanguage } from '../i18n.types.ts';

export function useChangeLanguage() {
    const { i18n } = useTranslation();

    const changeLanguage = useCallback(
        async (language: AppLanguage) => {
            await i18n.changeLanguage(language);
            writeToLocalStorage(LANGUAGE_STORAGE_KEY, language);
        },
        [i18n],
    );

    return {
        language: i18n.language as AppLanguage,
        changeLanguage,
    };
}
