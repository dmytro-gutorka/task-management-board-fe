import type { AddressSearchResult, NominatimSearchItem } from '../tasks-map.types.ts';
import { NOMINATIM_SEARCH_URL } from '../tasks-map.constants.ts';

export async function searchAddress(
    address: string,
    signal?: AbortSignal,
): Promise<AddressSearchResult | null> {
    const searchParams = new URLSearchParams({
        q: address,
        format: 'json',
        limit: '1',
    });

    const response = await fetch(`${NOMINATIM_SEARCH_URL}?${searchParams.toString()}`, {
        signal,
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to search address');
    }

    const [result] = (await response.json()) as NominatimSearchItem[];

    if (!result) return null;

    return {
        latitude: Number(result.lat),
        longitude: Number(result.lon),
        displayName: result.display_name,
    };
}
