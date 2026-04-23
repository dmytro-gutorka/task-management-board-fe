import { type ChangeEvent, type KeyboardEvent, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { IconTooltip } from '@/shared/components/icon-tooltip';

interface SearchInputProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

export function SearchInput({ searchValue, setSearchValue }: SearchInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function onOpen() {
        setIsOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    function onClose() {
        if (!searchValue) setIsOpen(false);
    }

    function onEscapeDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Escape') {
            setSearchValue('');
            setIsOpen(false);
        }
    }

    return (
        <div className="relative flex items-center">
            {!isOpen && (
                <IconTooltip content="Search">
                    <Button onClick={onOpen} variant="outline" size="icon" className="">
                        <Search className="h-4 w-4" />
                    </Button>
                </IconTooltip>
            )}
            <InputGroup
                className={cn(
                    'max-w-xs relative overflow-hidden',
                    isOpen || searchValue ? 'w-[14rem] transition-all duration-500' : 'w-0',
                )}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onEscapeDown(e)}
                onBlur={onClose}
            >
                <InputGroupInput placeholder="Search..." value={searchValue} ref={inputRef} />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>
        </div>
    );
}
