import {
    CardHeader,
    CardContent,
    Card,
    CardTitle,
    CardDescription,
} from '@/shared/components/shadcn/ui/card';
import { Button } from '../../shared/components/shadcn/ui/button.tsx';
import { Link } from 'react-router-dom';
import { TASKS_ROUTES } from '../../shared/constants/routes/tasks.routes.ts';
import { ArrowLeft } from 'lucide-react';
import { TasksMap } from './ui/tasks-map.tsx';
import { useUserGeolocation } from './model/hooks/useUserGeolocation.ts';
import { LocateFixed } from 'lucide-react';
import { AlertDescription, Alert } from '../../shared/components/shadcn/ui/alert.tsx';

export function TasksMapPage() {
    const {
        location,
        error: geolocationError,
        isLoading: isGeolocationLoading,
        requestLocation,
    } = useUserGeolocation();

    return (
        <main className="container mx-auto space-y-4 p-4">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Tasks map</h1>
                    <p className="text-sm text-muted-foreground">
                        Map view for tasks with geographic coordinates.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={requestLocation}
                        disabled={isGeolocationLoading}
                    >
                        <LocateFixed className="h-4 w-4" />
                        {isGeolocationLoading ? 'Detecting...' : 'Use my location'}
                    </Button>

                    <Button asChild variant="outline">
                        <Link to={TASKS_ROUTES.TASKS_PAGE}>
                            <ArrowLeft className="h-4 w-4" />
                            Back to tasks
                        </Link>
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Map</CardTitle>
                    <CardDescription>
                        Only tasks with coordinates will be displayed here.
                    </CardDescription>
                </CardHeader>

                {geolocationError && (
                    <Alert variant="destructive">
                        <AlertDescription>{geolocationError}</AlertDescription>
                    </Alert>
                )}

                <CardContent>
                    <div className="h-[calc(100vh-260px)] min-h-[520px] overflow-hidden rounded-xl border">
                        <TasksMap userLocation={location} />
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
