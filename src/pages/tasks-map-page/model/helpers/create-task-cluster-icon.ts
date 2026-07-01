import 'leaflet.markercluster';
import L from 'leaflet';

function getClusterSize(count: number) {
    if (count < 10) return 40;
    if (count < 50) return 48;

    return 56;
}

export function createTaskClusterIcon(cluster: L.MarkerCluster) {
    const count = cluster.getChildCount();
    const size = getClusterSize(count);

    return L.divIcon({
        className: '',
        iconSize: L.point(size, size, true),
        html: `
            <div
                class="flex items-center justify-center rounded-full border-2 border-background bg-primary font-semibold text-primary-foreground shadow-lg"
                style="width: ${size}px; height: ${size}px;"
            >
                ${count}
            </div>
        `,
    });
}
