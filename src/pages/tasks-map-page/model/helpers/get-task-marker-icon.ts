import L from 'leaflet';
import type { TaskPriority } from '../../../../shared/modules/tasks/task-card/model/task-card.types.ts';

const MARKER_SIZE: [number, number] = [44, 48];
const MARKER_ANCHOR: [number, number] = [22, 48];
const POPUP_ANCHOR: [number, number] = [0, -48];

const priorityMarkerClassNameMap: Record<TaskPriority, string> = {
    low: 'bg-emerald-500',
    medium: 'bg-amber-500',
    high: 'bg-red-500',
};

interface GetTaskMarkerIconParams {
    title: string;
    priority: TaskPriority;
}

function getTaskMarkerLabel(title: string) {
    if (title.length > 30) {
        return title.slice(0, 15) + '...';
    }

    return `#${title}`;
}

export function getTaskMarkerIcon({ title, priority }: GetTaskMarkerIconParams) {
    const markerClassName = priorityMarkerClassNameMap[priority];
    const label = getTaskMarkerLabel(title);

    return L.divIcon({
        className: '',
        iconSize: MARKER_SIZE,
        iconAnchor: MARKER_ANCHOR,
        popupAnchor: POPUP_ANCHOR,
        html: `
            <div class="group relative flex h-12 w-11 items-end justify-center">
                <div class="pointer-events-none absolute bottom-9 z-10 translate-y-1 scale-95 rounded-full border border-border bg-card px-1.5 py-0.5 text-[10px] font-semibold leading-none text-card-foreground opacity-0 shadow-sm transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                    ${label}
                </div>

                <div class="relative flex h-9 w-9 items-center justify-center transition-transform duration-150 ease-out group-hover:scale-105">
                    <div class="${markerClassName} h-7 w-7 rounded-full border-2 border-background shadow-lg ring-2 ring-background"></div>
                    <div class="${markerClassName} absolute bottom-0 h-3 w-3 rotate-45 border-b-2 border-r-2 border-background shadow-md"></div>
                </div>
            </div>
        `,
    });
}
