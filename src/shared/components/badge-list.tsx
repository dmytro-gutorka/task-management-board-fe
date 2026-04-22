import { Tags } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BadgeListProps {
    badges: string[] | undefined;
}

export function BadgeList({ badges }: BadgeListProps) {
    return (
        <>
            {badges?.length ? (
                <div className="flex items-start gap-2">
                    <Tags className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="flex flex-wrap gap-2">
                        {badges.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
}
