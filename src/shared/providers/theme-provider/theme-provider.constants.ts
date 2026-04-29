import type { ThemeProviderState } from '@/shared/providers/theme-provider/theme-provider.types';

export const themeOptions = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system',
} as const;

export const initialState: ThemeProviderState = {
    theme: themeOptions.SYSTEM,
    setTheme: () => null,
};
