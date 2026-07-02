export interface MapLocation {
    latitude: number;
    longitude: number;
}

export type GeolocationStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'unsupported' | 'error';

export interface NominatimSearchItem {
    lat: string;
    lon: string;
    display_name: string;
}

export interface AddressSearchResult extends MapLocation {
    displayName: string;
}
