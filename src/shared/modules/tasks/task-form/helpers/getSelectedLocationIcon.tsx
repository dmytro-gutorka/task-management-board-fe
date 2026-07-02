import L from 'leaflet';

export function getSelectedLocationIcon() {
    return L.divIcon({
        className: '',
        iconSize: [36, 40],
        iconAnchor: [18, 40],
        popupAnchor: [0, -40],
        html: `
            <div class="relative flex h-10 w-9 items-end justify-center">
                <div class="h-7 w-7 rounded-full border-2 border-background bg-primary shadow-lg ring-2 ring-background"></div>
                <div class="absolute bottom-0 h-3 w-3 rotate-45 border-b-2 border-r-2 border-background bg-primary shadow-md"></div>
            </div>
        `,
    });
}
