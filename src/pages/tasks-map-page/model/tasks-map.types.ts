export interface UserLocation {
    latitude: number;
    longitude: number;
}

export type GeolocationStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'unsupported' | 'error';
