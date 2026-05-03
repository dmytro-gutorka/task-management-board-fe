import { type ThemeOptions } from '../model/theme-provider.types.ts';
import { useEffect } from 'react';
import { THEMES } from '../model/theme-provider.constants.ts';

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
