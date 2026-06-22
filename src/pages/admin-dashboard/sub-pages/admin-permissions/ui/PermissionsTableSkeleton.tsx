import { Skeleton } from '../../../../../shared/components/shadcn/ui/skeleton.tsx';

export function PermissionsTableSkeleton() {
    return (
        <div className="space-y-2 rounded-lg border p-3">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="grid grid-cols-[160px_1fr_1fr_2fr] gap-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-full" />
                </div>
            ))}
        </div>
    );
}
