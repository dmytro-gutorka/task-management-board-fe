import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDebounce } from './useDebounce.ts';

export function useSearch(searchValue: string, setSearchChange: (value: string) => void) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(searchValue);

    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedValue = useDebounce(inputValue, 300);

    useEffect(() => {
        setSearchChange(debouncedValue);
    }, [debouncedValue]);

    function handleOpen() {
        setIsOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    function handleClose() {
        if (!inputValue) setIsOpen(false);
    }

    function handleEscapeDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Escape') {
            setInputValue('');
            setSearchChange('');
            setIsOpen(false);
        }
    }

    return {
        handleOpen,
        handleClose,
        handleEscapeDown,
        setInputValue,
        isOpen,
        inputValue,
        inputRef,
    };
}
