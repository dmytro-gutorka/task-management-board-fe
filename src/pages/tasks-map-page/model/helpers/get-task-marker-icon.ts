import L from 'leaflet';
import type { TaskPriority } from '../../../../shared/modules/tasks/task-card/model/task-card.types.ts';

const MARKER_SIZE: [number, number] = [34, 34];
const MARKER_ANCHOR: [number, number] = [17, 34];
const POPUP_ANCHOR: [number, number] = [0, -34];

const priorityMarkerClassNameMap: Record<TaskPriority, string> = {
    low: 'bg-emerald-500',
    medium: 'bg-amber-500',
    high: 'bg-red-500',
};

export function getTaskMarkerIcon(priority: TaskPriority) {
    const markerClassName = priorityMarkerClassNameMap[priority];

    return L.divIcon({
        className: '',
        iconSize: MARKER_SIZE,
        iconAnchor: MARKER_ANCHOR,
        popupAnchor: POPUP_ANCHOR,
        html: `
            <div class="relative flex h-[34px] w-[34px] items-center justify-center">
                <div class="${markerClassName} h-6 w-6 rounded-full border-2 border-white shadow-md"></div>
                <div class="${markerClassName} absolute bottom-0 h-3 w-3 rotate-45 border-b-2 border-r-2 border-white shadow-md"></div>
            </div>
        `,
    });
}
