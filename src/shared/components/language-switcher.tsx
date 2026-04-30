import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type AppLanguage, languageOptions } from '../modules/i18n/i18n.constants.ts';
import { useChangeLanguage } from '../modules/i18n/use-change-language.ts';
import { IconTooltip } from './icon-tooltip.tsx';
import { Button } from './shadcn/ui/button.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from './shadcn/ui/dropdown-menu';

export function LanguageSwitcher() {
    const { language, changeLanguage } = useChangeLanguage();
    const { t } = useTranslation(['common']);

    return (
        <DropdownMenu>
            <IconTooltip content={t('switchLanguage', { ns: 'common' })}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Languages className="h-4 w-4" />
                        <span className="sr-only">Change language</span>
                    </Button>
                </DropdownMenuTrigger>
            </IconTooltip>

            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={language}
                    onValueChange={(value) => {
                        void changeLanguage(value as AppLanguage);
                    }}
                >
                    {languageOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
