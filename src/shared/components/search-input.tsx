import { type ChangeEvent, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const SearchInput = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const open = () => {
        setIsOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    };

    const close = () => {
        if (!value) setIsOpen(false);
    };

    const clear = () => {
        setValue('');
        inputRef.current?.focus();
    };

    function onEscapeDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Escape') {
            setValue('');
            setIsOpen(false);
        }
    }

    return (
        <div className="relative flex items-center">
            {!isOpen && (
                <button
                    type="button"
                    onClick={open}
                    className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
                >
                    <Search className="h-4 w-4" />
                </button>
            )}

            <div
                className={cn(
                    'relative overflow-hidden',
                    isOpen ? 'w-[240px] transition-all duration-500' : 'w-0',
                )}
            >
                <Input
                    ref={inputRef}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    onKeyDown={(e) => onEscapeDown(e)}
                    onBlur={close}
                    placeholder="Search..."
                    className={cn(
                        'pr-8 transition-all duration-900',
                        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    )}
                />
                {value && (
                    <button onClick={clear} className="absolute right-2 top-1/2 -translate-y-1/2">
                        <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                )}
            </div>
        </div>
    );
};
