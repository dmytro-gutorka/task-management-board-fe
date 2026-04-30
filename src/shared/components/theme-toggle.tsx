import { Moon, Sun } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/shadcn/ui/dropdown-menu';
import { IconTooltip } from '@/shared/components/icon-tooltip';
import { useTheme } from '@/shared/providers/theme-provider/hooks/useTheme';
import { themeOptions, THEMES } from '@/shared/providers/theme-provider/theme-provider.constants';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
    const { setTheme } = useTheme();
    const { t } = useTranslation();

    const themes = themeOptions(t);

    return (
        <DropdownMenu>
            <IconTooltip content={t('common.toggleTheme')}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
            </IconTooltip>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme(THEMES.LIGHT)}>
                    {themes.light}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(THEMES.DARK)}>
                    {themes.dark}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(THEMES.SYSTEM)}>
                    {themes.system}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
