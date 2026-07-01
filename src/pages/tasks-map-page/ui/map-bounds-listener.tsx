import { useEffect } from 'react';
import type { TaskMapQueryParams } from '../../tasks-page/model/task-filters/tasks-filter.types.ts';
import { useMapEvents } from 'react-leaflet';

interface MapBoundsListenerProps {
    onBoundsChange: (params: TaskMapQueryParams) => void;
}

export function MapBoundsListener({ onBoundsChange }: MapBoundsListenerProps) {
    const map = useMapEvents({
        moveend: () => {
            emitBounds();
        },
        zoomend: () => {
            emitBounds();
        },
    });

    function emitBounds() {
        const bounds = map.getBounds();

        onBoundsChange({
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
        });
    }

    useEffect(() => {
        emitBounds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
