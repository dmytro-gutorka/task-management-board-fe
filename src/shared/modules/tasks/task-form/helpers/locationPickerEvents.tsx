import type { MapLocation } from '../../../../../pages/tasks-map-page/model/tasks-map.types.ts';
import { useMapEvents } from 'react-leaflet';

interface LocationPickerEventsProps {
    onChange: (coordinates: MapLocation) => void;
}

export function LocationPickerEvents({ onChange }: LocationPickerEventsProps) {
    useMapEvents({
        click: (event) => {
            onChange({
                latitude: event.latlng.lat,
                longitude: event.latlng.lng,
            });
        },
    });

    return null;
}
