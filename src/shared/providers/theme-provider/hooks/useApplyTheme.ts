import { type ThemeOptions } from '@/shared/providers/theme-provider/theme-provider.types';
import { useEffect } from 'react';
import { themeOptions } from '@/shared/providers/theme-provider/theme-provider.constants';

export function useApplyTheme(theme: ThemeOptions) {
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove(themeOptions.LIGHT, themeOptions.DARK);

        if (theme === themeOptions.SYSTEM) {
            const isDark = window.matchMedia(
                `(prefers-color-scheme: ${themeOptions.DARK})`,
            ).matches;

            root.classList.add(isDark ? themeOptions.DARK : themeOptions.DARK);
            return;
        }

        root.classList.add(theme);
    }, [theme]);
}
