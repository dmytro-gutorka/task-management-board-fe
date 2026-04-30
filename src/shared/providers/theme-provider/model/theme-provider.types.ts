import type { ValueOf } from '../../../types/common.ts';
import { THEMES } from './theme-provider.constants.ts';

export type ThemeOptions = ValueOf<typeof THEMES>;

export interface ThemeProviderState {
    theme: ThemeOptions;
    setTheme: (theme: ThemeOptions) => void;
}
