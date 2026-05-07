import { Loader2 } from 'lucide-react';
import { cn } from '../helpers/shadcn.utils.ts';

type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
    size?: LoaderSize;
    label?: string;
    className?: string;
}

const loaderSizeClassName: Record<LoaderSize, string> = {
    sm: 'h-6 w-6',
    md: 'h-15 w-15',
    lg: 'h-30 w-30',
};

export function Loader({ size = 'sm', label, className }: LoaderProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={cn('inline-flex items-center gap-2', className)}
        >
            <Loader2 className={cn('animate-spin', loaderSizeClassName[size])} />

            {label ? <span className="text-sm text-muted-foreground">{label}</span> : null}

            <span className="sr-only">{label ?? 'Loading'}</span>
        </div>
    );
}
