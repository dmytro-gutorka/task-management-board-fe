import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { NullableMapCoordinates } from '../../../../types/common.ts';

interface LocationPickerFlyToSelectedProps extends NullableMapCoordinates {}

export function LocationPickerFlyToSelected({
    latitude,
    longitude,
}: LocationPickerFlyToSelectedProps) {
    const map = useMap();

    useEffect(() => {
        if (latitude === null || longitude === null) return;

        map.flyTo([latitude, longitude], Math.max(map.getZoom(), 13), {
            animate: true,
            duration: 0.5,
        });
    }, [latitude, longitude, map]);

    return null;
}
