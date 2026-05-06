import { useRef, useState } from 'react';
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
import { type KeyboardEvent } from 'react';
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    resultsCount?: number;
}

export function SearchInput({ value, onChange, resultsCount = 0 }: SearchInputProps) {
    const [isOpen, setIsOpen] = useState(Boolean(value));
    const inputRef = useRef<HTMLInputElement>(null);

    const { t } = useTranslation(['common', 'tasks']);

    function handleOpen() {
        setIsOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    function handleClose() {
        if (!value) setIsOpen(false);
    }

    function handleEscapeDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Escape') {
            onChange('');
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
                    isOpen || value ? 'w-[14rem] transition-all duration-500' : 'w-0',
                )}
                onKeyDown={handleEscapeDown}
                onBlur={handleClose}
            >
                <InputGroupInput
                    placeholder={`${t('search', { ns: 'common' })}...`}
                    value={value}
                    ref={inputRef}
                    onChange={(e) => onChange(e.target.value)}
                />

                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>

                <InputGroupAddon align="inline-end">
                    {resultsCount} {t('results', { ns: 'common' })}
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
