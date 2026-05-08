import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from '@/shared/components/shadcn/ui/field';
import type { ReactNode } from 'react';

interface ReadOnlyFieldProps {
    icon: ReactNode;
    label: string;
    value: string;
    description?: string;
}

export function ReadOnlyField({ icon, label, value, description }: ReadOnlyFieldProps) {
    return (
        <Field className="rounded-lg border bg-muted/30 p-4">
            <FieldLabel className="flex items-center gap-2 text-muted-foreground">
                {icon}
                {label}
            </FieldLabel>

            <FieldContent>
                <div className="break-words text-sm font-medium">{value}</div>

                {description && <FieldDescription>{description}</FieldDescription>}
            </FieldContent>
        </Field>
    );
}
