import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../../shared/hooks/useDebounce.ts';

export function useTasksSearch(initialValue: string, setSearch: (value: string) => void) {
    const [searchInputValue, setSearchInputValue] = useState(initialValue);
    const debouncedSearchValue = useDebounce(searchInputValue, 300);

    useEffect(() => {
        setSearch(debouncedSearchValue);
    }, [debouncedSearchValue, setSearch]);

    return {
        searchInputValue,
        setSearchInputValue,
    };
}
