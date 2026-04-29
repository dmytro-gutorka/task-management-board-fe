import type { ValueOf } from '@/shared/types/common';
import { themeOptions } from '@/shared/providers/theme-provider/theme-provider.constants';

export type ThemeOptions = ValueOf<typeof themeOptions>;

export interface ThemeProviderState {
    theme: ThemeOptions;
    setTheme: (theme: ThemeOptions) => void;
}
