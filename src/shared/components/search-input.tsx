import { type ChangeEvent, type KeyboardEvent, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function SearchInput() {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    function onOpen() {
        setIsOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    function onClose() {
        if (!value) setIsOpen(false);
    }

    function onClear() {
        setValue('');
        inputRef.current?.focus();
    }

    function onEscapeDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Escape') {
            setValue('');
            setIsOpen(false);
        }
    }

    return (
        <div className="relative flex items-center">
            {!isOpen && (
                <Button onClick={onOpen} variant="outline" size="icon" className="mr-2">
                    <Search className="h-4 w-4" />
                </Button>
            )}

            <div
                className={cn(
                    'relative overflow-hidden',
                    isOpen ? 'w-[14rem] transition-all duration-500' : 'w-0',
                )}
            >
                <Input
                    ref={inputRef}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    onKeyDown={(e) => onEscapeDown(e)}
                    onBlur={onClose}
                    placeholder="Search..."
                    className={cn(
                        'pr-8 transition-all duration-900',
                        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    )}
                />
                {value && (
                    <Button
                        onClick={onClear}
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 hover:none"
                    >
                        <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                )}
            </div>
        </div>
    );
}
