import L from 'leaflet';

export function getUserLocationMarkerIcon() {
    return L.divIcon({
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        html: `
            <div class="relative flex h-8 w-8 items-center justify-center">
                <div class="absolute h-8 w-8 rounded-full bg-primary/20"></div>
                <div class="h-4 w-4 rounded-full border-2 border-background bg-primary shadow-lg"></div>
            </div>
        `,
    });
}
