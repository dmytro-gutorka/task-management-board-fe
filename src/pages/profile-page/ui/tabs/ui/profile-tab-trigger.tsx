import { UserRound } from 'lucide-react';
import { TabsTrigger } from '../../../../../shared/components/shadcn/ui/tabs.tsx';
import type { ProfileTab } from '../../../model/profile-page.types.ts';

interface ProfileTabTriggerProps {
    title: string;
    description: string;
    tab: ProfileTab;
}

export function ProfileTabTrigger({ title, description, tab }: ProfileTabTriggerProps) {
    return (
        <TabsTrigger
            value={tab}
            className="flex h-full min-h-16 items-center justify-start gap-3 whitespace-normal rounded-md px-3 py-3 text-left shadow-md border-gray-500"
        >
            <UserRound className="size-4 shrink-0" />

            <span className="flex min-w-0 flex-col items-start">
                <span className="font-medium">{title}</span>
                <span className="text-wrap text-xs font-normal text-muted-foreground">
                    {description}
                </span>
            </span>
        </TabsTrigger>
    );
}
