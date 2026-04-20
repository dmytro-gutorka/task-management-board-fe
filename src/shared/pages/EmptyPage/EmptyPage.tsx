import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type EmptyPageProps = {
    icon?: ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
};

export const EmptyPage = ({ icon, title, description, actionLabel, onAction }: EmptyPageProps) => {
    return (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
            {icon ? <div className="mb-4 rounded-full bg-muted p-3">{icon}</div> : null}

            <h2 className="text-lg font-semibold">{title}</h2>

            {description ? (
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
            ) : null}

            {actionLabel && onAction ? (
                <Button className="mt-4" onClick={onAction}>
                    {actionLabel}
                </Button>
            ) : null}
        </div>
    );
};
