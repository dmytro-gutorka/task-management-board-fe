import { type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/shared/components/shadcn/ui/input-group';
import { IconTooltip } from '@/shared/components/icon-tooltip';
import { useSearch } from '../hooks/useSearch.ts';

interface SearchInputProps {
    searchValue: string;
    setSearchChange: (value: string) => void;
}

export function SearchInput({ searchValue, setSearchChange }: SearchInputProps) {
    const { t } = useTranslation(['common', 'tasks']);
    const {
        handleOpen,
        handleClose,
        handleEscapeDown,
        setInputValue,
        isOpen,
        inputValue,
        inputRef,
    } = useSearch(searchValue, setSearchChange);

    return (
        <div className="relative flex items-center">
            {!isOpen && (
                <IconTooltip content={t('search', { ns: 'common' })}>
                    <Button
                        onClick={handleOpen}
                        variant="outline"
                        size="icon"
                        aria-label={t('search', { ns: 'common' })}
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </IconTooltip>
            )}

            <InputGroup
                className={cn(
                    'max-w-xs relative overflow-hidden',
                    isOpen || inputValue ? 'w-[14rem] transition-all duration-500' : 'w-0',
                )}
                onKeyDown={handleEscapeDown}
                onBlur={handleClose}
            >
                <InputGroupInput
                    placeholder={`${t('search', { ns: 'common' })}...`}
                    value={inputValue}
                    ref={inputRef}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                />

                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>

                <InputGroupAddon align="inline-end">
                    12 {t('results', { ns: 'common' })}
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
