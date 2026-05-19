import { CheckCircle2 } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/shadcn/ui/card';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import { Progress } from '../../../../../../shared/components/shadcn/ui/progress.tsx';

interface ProfileCompletenessCardProps {
    value: number;
}

export function ProfileCompletenessCard({ value }: ProfileCompletenessCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                    <CardTitle>Profile completeness</CardTitle>

                    <CardDescription>Complete your profile information.</CardDescription>
                </div>

                <Badge variant="secondary">{value}%</Badge>
            </CardHeader>

            <CardContent className="space-y-3">
                <Progress value={value} />

                {value === 100 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4" />
                        Your profile is complete.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
