import type { ThemeProviderState } from '@/shared/providers/theme-provider/theme-provider.types';

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system',
} as const;

export const themeOptions = (t: (key: string) => string) =>
    ({
        [THEMES.DARK]: t('common.themes.dark'),
        [THEMES.LIGHT]: t('common.themes.light'),
        [THEMES.SYSTEM]: t('common.themes.system'),
    }) as const;

export const initialState: ThemeProviderState = {
    theme: THEMES.DARK,
    setTheme: () => null,
};
