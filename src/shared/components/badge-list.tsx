import { Tags } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type ComponentProps } from 'react';

interface BadgeListProps {
    badges: string[] | undefined;
    variant?: ComponentProps<typeof Badge>['variant'];
}

export function BadgeList({ badges, variant = 'default' }: BadgeListProps) {
    return (
        <>
            {badges?.length ? (
                <div className="flex items-start gap-2">
                    <Tags className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="flex flex-wrap gap-2">
                        {badges.map((tag) => (
                            <Badge key={tag} variant={variant}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
}
