import type { ThemeProviderState } from './theme-provider.types.ts';

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system',
} as const;

export const themeOptions = (t: (key: string, obj: { ns: string }) => string) =>
    ({
        [THEMES.DARK]: t('themes.dark', { ns: 'common' }),
        [THEMES.LIGHT]: t('themes.light', { ns: 'common' }),
        [THEMES.SYSTEM]: t('themes.system', { ns: 'common' }),
    }) as const;

export const initialState: ThemeProviderState = {
    theme: THEMES.DARK,
    setTheme: () => null,
};
