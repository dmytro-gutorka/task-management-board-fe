import { cn } from '../helpers/shadcn.utils.ts';
import { Loader } from './loader.tsx';

interface PageLoaderProps {
    label?: string;
    className?: string;
}

export function PageLoader({ label = 'Loading...', className }: PageLoaderProps) {
    return (
        <div className={cn('flex min-h-[320px] items-center justify-center', className)}>
            <Loader size="md" label={label} />
        </div>
    );
}
