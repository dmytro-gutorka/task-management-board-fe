import { type ChangeEvent, type KeyboardEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { cn } from '../helpers/shadcn.utils.ts';
import { Button } from '@/shared/components/shadcn/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/shared/components/shadcn/ui/input-group';
import { IconTooltip } from '@/shared/components/icon-tooltip';

interface SearchInputProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    resultsFound: number;
    setQuerySearchValue: (value: string) => void;
}

export function SearchInput({ setSearchValue, searchValue, resultsFound }: SearchInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { t } = useTranslation(['common', 'tasks']);

    function handleOpen() {
        setIsOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    function handleClose() {
        if (!searchValue) setIsOpen(false);
    }

    function handleEscapeDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Escape') {
            setSearchValue('');
            setIsOpen(false);
        }
    }

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
                    isOpen || searchValue ? 'w-[14rem] transition-all duration-500' : 'w-0',
                )}
                onKeyDown={handleEscapeDown}
                onBlur={handleClose}
            >
                <InputGroupInput
                    placeholder={`${t('search', { ns: 'common' })}...`}
                    value={searchValue}
                    ref={inputRef}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                />

                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>

                {searchValue && (
                    <InputGroupAddon align="inline-end">
                        {resultsFound} {t('results', { ns: 'common' })}
                    </InputGroupAddon>
                )}
            </InputGroup>
        </div>
    );
}
