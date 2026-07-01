import 'leaflet.markercluster';
import L from 'leaflet';

const ClusterCount = {
    '10': {
        clusterSize: 44,
        clusterToneCLassName: 'bg-secondary text-secondary-foreground',
    },
    '50': {
        clusterSize: 52,
        clusterToneCLassName: 'bg-primary text-primary-foreground',
    },
    '99+': {
        clusterSize: 60,
        clusterToneCLassName: 'bg-destructive text-destructive-foreground',
    },
};

function getClusterLabel(count: number) {
    if (count > 99) return '99+';

    return String(count);
}

function getClusterSize(count: number) {
    if (count < 10) return ClusterCount['10'].clusterSize;
    if (count < 50) return ClusterCount['50'].clusterSize;

    return ClusterCount['99+'].clusterSize;
}

function getClusterToneClassName(count: number) {
    if (count < 10) return ClusterCount['10'].clusterSize;
    if (count < 50) return ClusterCount['50'].clusterSize;

    return ClusterCount['99+'].clusterSize;
}

export function createTaskClusterIcon(cluster: L.MarkerCluster) {
    const count = cluster.getChildCount();
    const size = getClusterSize(count);
    const innerSize = size - 12;
    const toneClassName = getClusterToneClassName(count);

    return L.divIcon({
        className: '',
        iconSize: L.point(size, size, true),
        html: `
            <div
                class="task-map-cluster group flex items-center justify-center rounded-full border border-border bg-card/95 p-1 shadow-lg ring-4 ring-background/80 backdrop-blur-sm transition-transform duration-200 ease-out hover:scale-105"
                style="width: ${size}px; height: ${size}px;"
            >
                <div
                    class="flex items-center justify-center rounded-full ${toneClassName} shadow-sm"
                    style="width: ${innerSize}px; height: ${innerSize}px;"
                >
                    <span class="text-sm font-semibold leading-none tracking-tight">
                        ${getClusterLabel(count)}
                    </span>
                </div>
            </div>
        `,
    });
}
