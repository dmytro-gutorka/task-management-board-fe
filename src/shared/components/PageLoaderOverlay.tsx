import { cn } from '../helpers/shadcn.utils.ts';
import { Loader } from './loader.tsx';

interface PageLoaderOverlayProps {
    label?: string;
    className?: string;
}

export function PageLoaderOverlay({ label = 'Loading...', className }: PageLoaderOverlayProps) {
    return (
        <div
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center',
                'bg-background/70 backdrop-blur-sm',
                className,
            )}
        >
            <div className="rounded-lg border bg-card px-6 py-4 shadow-lg">
                <Loader size="md" label={label} />
            </div>
        </div>
    );
}
