import { APP_LANGUAGE } from './i18n.constants.ts';

export type AppLanguage = (typeof APP_LANGUAGE)[keyof typeof APP_LANGUAGE];
