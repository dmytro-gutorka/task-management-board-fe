import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/shadcn/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/shared/components/shadcn/ui/input-group';
import { IconTooltip } from '@/shared/components/icon-tooltip';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface SearchInputProps {
    searchValue: string;
    setSearchChange: (value: string) => void;
}

export function SearchInput({ searchValue, setSearchChange }: SearchInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(searchValue);

    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedValue = useDebounce(inputValue, 300);

    useEffect(() => {
        setSearchChange(debouncedValue);
    }, [debouncedValue, setSearchChange]);

    function onOpen() {
        setIsOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    function onClose() {
        if (!inputValue) setIsOpen(false);
    }

    function onEscapeDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Escape') {
            setInputValue('');
            setSearchChange('');
            setIsOpen(false);
        }
    }

    return (
        <div className="relative flex items-center">
            {!isOpen && (
                <IconTooltip content="Search">
                    <Button onClick={onOpen} variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </IconTooltip>
            )}

            <InputGroup
                className={cn(
                    'max-w-xs relative overflow-hidden',
                    isOpen || inputValue ? 'w-[14rem] transition-all duration-500' : 'w-0',
                )}
                onKeyDown={onEscapeDown}
                onBlur={onClose}
            >
                <InputGroupInput
                    placeholder="Search..."
                    value={inputValue}
                    ref={inputRef}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                />

                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>

                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>
        </div>
    );
}
