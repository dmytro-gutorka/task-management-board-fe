import { Skeleton } from '../../../../../shared/components/shadcn/ui/skeleton.tsx';

export function UsersTableSkeleton() {
    return (
        <div className="space-y-2 rounded-lg border p-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                    <Skeleton className="h-5 w-10" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-56" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-16" />
                </div>
            ))}
        </div>
    );
}
