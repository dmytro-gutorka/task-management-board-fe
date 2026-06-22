import { Skeleton } from '../../../shared/components/shadcn/ui/skeleton.tsx';
import { Card, CardHeader, CardContent } from '../../../shared/components/shadcn/ui/card.tsx';

export function UserDetailsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-28" />
            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-56" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="h-4 w-full" />
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="h-16 w-full" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
