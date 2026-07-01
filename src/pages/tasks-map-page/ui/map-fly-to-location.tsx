import { useEffect } from 'react';
import type { UserLocation } from '../model/tasks-map.types.ts';
import { useMap } from 'react-leaflet';
import type { Nullable } from '../../../shared/types/common.ts';

interface MapFlyToLocationProps {
    location: Nullable<UserLocation>;
}

export function MapFlyToLocation({ location }: MapFlyToLocationProps) {
    const map = useMap();

    useEffect(() => {
        if (!location) return;

        map.flyTo([location.latitude, location.longitude], 14, {
            animate: true,
            duration: 1,
        });
    }, [location, map]);

    return null;
}
