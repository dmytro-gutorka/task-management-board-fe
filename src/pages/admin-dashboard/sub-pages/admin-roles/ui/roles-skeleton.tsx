import { Card, CardHeader, CardContent } from '../../../../../shared/components/shadcn/ui/card.tsx';
import { Skeleton } from '../../../../../shared/components/shadcn/ui/skeleton.tsx';

export function RolesSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index}>
                    <CardHeader>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 6 }).map((__, badgeIndex) => (
                                <Skeleton key={badgeIndex} className="h-5 w-24 rounded-full" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
