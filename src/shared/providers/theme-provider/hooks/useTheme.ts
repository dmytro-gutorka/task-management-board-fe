import { useContext } from 'react';
import { ThemeProviderContext } from '@/shared/providers/theme-provider/theme-provider';

export function useTheme() {
    const context = useContext(ThemeProviderContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
}
