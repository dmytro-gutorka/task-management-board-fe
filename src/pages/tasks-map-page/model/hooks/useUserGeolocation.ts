import { useCallback, useState } from 'react';
import type { UserLocation, GeolocationStatus } from '../tasks-map.types.ts';
import type { Nullable } from '../../../../shared/types/common.ts';

export function useUserGeolocation() {
    const [location, setLocation] = useState<Nullable<UserLocation>>(null);
    const [status, setStatus] = useState<GeolocationStatus>('idle');
    const [error, setError] = useState<Nullable<string>>(null);

    const requestLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setStatus('unsupported');
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setStatus('loading');
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                setStatus('granted');
            },
            (geolocationError) => {
                if (geolocationError.code === geolocationError.PERMISSION_DENIED) {
                    setStatus('denied');
                    setError('Location access was denied.');
                    return;
                }

                setStatus('error');
                setError('Failed to get your current location.');
            },
            {
                enableHighAccuracy: true,
                timeout: 10_000,
                maximumAge: 60_000,
            },
        );
    }, []);

    return {
        location,
        status,
        error,
        isLoading: status === 'loading',
        requestLocation,
    };
}
