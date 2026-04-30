import type { ValueOf } from '@/shared/types/common';
import { THEMES } from '@/shared/providers/theme-provider/theme-provider.constants';

export type ThemeOptions = ValueOf<typeof THEMES>;

export interface ThemeProviderState {
    theme: ThemeOptions;
    setTheme: (theme: ThemeOptions) => void;
}
