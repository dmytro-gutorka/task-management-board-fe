import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Button } from '../../../../components/shadcn/ui/button.tsx';
import { LocationPickerFlyToSelected } from '../helpers/locationPickerFlyToSelected.tsx';
import type { NullableMapCoordinates } from '../../../../types/common.ts';
import { getSelectedLocationIcon } from '../helpers/getSelectedLocationIcon.tsx';
import {
    DEFAULT_TASK_MODAL_MAP_CENTER,
    DEFAULT_TASK_MODAL_MAP_ZOOM,
} from '../model/tasks-form.constants.ts';
import type { MapLocation } from '../../../../../pages/tasks-map-page/model/tasks-map.types.ts';
import { LocationPickerEvents } from '../helpers/locationPickerEvents.tsx';

interface LocationPickerMapProps extends NullableMapCoordinates {
    onChange: (coordinates: MapLocation) => void;
    onClear: () => void;
}

export function LocationPickerMap({
    latitude,
    longitude,
    onChange,
    onClear,
}: LocationPickerMapProps) {
    const hasSelectedLocation = latitude !== null && longitude !== null;

    return (
        <div className="space-y-3">
            <div className="h-[280px] overflow-hidden rounded-xl border">
                <MapContainer
                    center={
                        hasSelectedLocation ? [latitude, longitude] : DEFAULT_TASK_MODAL_MAP_CENTER
                    }
                    zoom={DEFAULT_TASK_MODAL_MAP_ZOOM}
                    minZoom={4}
                    maxZoom={18}
                    scrollWheelZoom
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <LocationPickerEvents onChange={onChange} />
                    <LocationPickerFlyToSelected latitude={latitude} longitude={longitude} />

                    {hasSelectedLocation && (
                        <Marker position={[latitude, longitude]} icon={getSelectedLocationIcon()} />
                    )}
                </MapContainer>
            </div>

            {hasSelectedLocation && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">
                        Selected: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                    </span>

                    <Button type="button" variant="outline" size="sm" onClick={onClear}>
                        Clear location
                    </Button>
                </div>
            )}
        </div>
    );
}
