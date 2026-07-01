import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapTasks } from '../model/hooks/useMapTasks.ts';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../../../shared/components/shadcn/ui/alert.tsx';
import { MapBoundsListener } from './map-bounds-listener.tsx';
import { Badge } from '../../../shared/components/shadcn/ui/badge.tsx';
import { Button } from '../../../shared/components/shadcn/ui/button.tsx';
import { Link } from 'react-router-dom';
import { TASKS_ROUTES } from '../../../shared/constants/routes/tasks.routes.ts';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../model/tasks-map.constants.ts';

export function TasksMap() {
    const { tasks, isLoading, error, loadMapTasks } = useMapTasks();

    return (
        <div className="relative h-full w-full">
            {isLoading && (
                <div className="absolute right-4 top-4 z-[1000] rounded-md border bg-background px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-2 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading tasks...
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute left-4 right-4 top-4 z-[1000]">
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            )}

            <MapContainer
                center={DEFAULT_MAP_CENTER}
                zoom={DEFAULT_MAP_ZOOM}
                minZoom={4}
                maxZoom={18}
                scrollWheelZoom
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapBoundsListener onBoundsChange={(params) => void loadMapTasks(params)} />

                {tasks.map((task) => (
                    <Marker key={task.id} position={[task.latitude, task.longitude]}>
                        <Popup>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <p className="font-medium">{task.title}</p>

                                    <div className="flex gap-2">
                                        <Badge variant="secondary">{task.status}</Badge>
                                        <Badge>{task.priority}</Badge>
                                    </div>
                                </div>

                                <Button asChild size="sm" className="w-full">
                                    <Link
                                        to={TASKS_ROUTES.TASKS_DETAILS_PAGE.replace(
                                            ':taskId',
                                            String(task.id),
                                        )}
                                    >
                                        Open task
                                    </Link>
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
