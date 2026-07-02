import { useFormContext } from 'react-hook-form';
import type { TaskFormValues } from '../model/tasks-form.types.ts';
import { Field, FieldLabel, FieldDescription } from '../../../../components/shadcn/ui/field.tsx';
import { LocationPickerMap } from './location-picker-map.tsx';

export function TaskLocationField() {
    const form = useFormContext<TaskFormValues>();

    const latitude = form.watch('latitude');
    const longitude = form.watch('longitude');

    function handleLocationChange(coordinates: { latitude: number; longitude: number }) {
        form.setValue('latitude', coordinates.latitude, {
            shouldDirty: true,
            shouldValidate: true,
        });

        form.setValue('longitude', coordinates.longitude, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }

    function handleLocationClear() {
        form.setValue('latitude', null, {
            shouldDirty: true,
            shouldValidate: true,
        });

        form.setValue('longitude', null, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }

    return (
        <Field className="rounded-xl border p-4">
            <div className="space-y-1">
                <FieldLabel>Task location</FieldLabel>
                <FieldDescription>
                    Click on the map to choose where this task should appear.
                </FieldDescription>
            </div>

            <LocationPickerMap
                latitude={latitude}
                longitude={longitude}
                onChange={handleLocationChange}
                onClear={handleLocationClear}
            />
        </Field>
    );
}
