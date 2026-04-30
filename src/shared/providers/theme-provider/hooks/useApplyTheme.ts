import { type ThemeOptions } from '@/shared/providers/theme-provider/theme-provider.types';
import { useEffect } from 'react';
import { THEMES } from '@/shared/providers/theme-provider/theme-provider.constants';

export function useApplyTheme(theme: ThemeOptions) {
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove(THEMES.LIGHT, THEMES.DARK);

        if (theme === THEMES.SYSTEM) {
            const isDark = window.matchMedia(`(prefers-color-scheme: ${THEMES.DARK})`).matches;

            root.classList.add(isDark ? THEMES.DARK : THEMES.LIGHT);
            return;
        }

        root.classList.add(theme);
    }, [theme]);
}
