import { useCallback, useState, useRef } from 'react';
import { searchAddress } from '../services/address-geocoding.service.ts';
import type { AddressSearchResult } from '../tasks-map.types.ts';

export function useAddressSearch() {
    const [result, setResult] = useState<AddressSearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const search = useCallback(async (address: string) => {
        const normalizedAddress = address.trim();

        if (!normalizedAddress) {
            setError('Enter an address to search.');
            return null;
        }

        abortControllerRef.current?.abort();

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setIsLoading(true);
        setError(null);

        try {
            const addressSearchResult = await searchAddress(
                normalizedAddress,
                abortController.signal,
            );

            if (!addressSearchResult) {
                setResult(null);
                setError('Address was not found.');
                return null;
            }

            setResult(addressSearchResult);
            return addressSearchResult;
        } catch {
            if (abortController.signal.aborted) return null;

            setError('Failed to search address.');
            return null;
        } finally {
            if (!abortController.signal.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    return {
        result,
        isLoading,
        error,
        search,
    };
}
