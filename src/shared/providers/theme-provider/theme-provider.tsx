import { createContext, type ReactNode, useState } from 'react';
import type { ThemeOptions, ThemeProviderState } from './model/theme-provider.types.ts';
import { initialState, THEMES } from './model/theme-provider.constants.ts';
import { useApplyTheme } from '@/shared/providers/theme-provider/hooks/useApplyTheme';

export interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: ThemeOptions;
    storageKey?: string;
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = THEMES.SYSTEM,
    storageKey = 'task-board-theme',
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<ThemeOptions>(getThemeFromStorage());

    function getThemeFromStorage(): ThemeOptions {
        return (localStorage.getItem(storageKey) as ThemeOptions) || defaultTheme;
    }

    function setTheme(theme: ThemeOptions) {
        localStorage.setItem(storageKey, theme);
        setThemeState(theme);
    }

    useApplyTheme(theme);

    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
