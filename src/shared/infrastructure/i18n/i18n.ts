import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE } from './model/i18n.constants.ts';

void i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        ns: ['common', 'tasks', 'auth'],
        defaultNS: 'common',
        fallbackNS: 'common',
        fallbackLng: DEFAULT_LANGUAGE,
        supportedLngs: ['en', 'uk'],

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export { i18n };
