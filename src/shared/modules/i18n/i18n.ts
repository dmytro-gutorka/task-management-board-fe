import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import uk from './locales/uk.json';
import {
    DEFAULT_LANGUAGE,
    LANGUAGE_STORAGE_KEY,
    type AppLanguage,
    APP_LANGUAGE,
} from './i18n.constants';

const getInitialLanguage = (): AppLanguage => {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (storedLanguage === APP_LANGUAGE.EN || storedLanguage === APP_LANGUAGE.UK) {
        return storedLanguage;
    }

    return DEFAULT_LANGUAGE;
};

void i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        uk: {
            translation: uk,
        },
    },
    lng: getInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
        escapeValue: false,
    },
});

export { i18n };
