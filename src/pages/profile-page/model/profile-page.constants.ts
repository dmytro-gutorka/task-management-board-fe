import { Shield, SlidersHorizontal, UserRound } from 'lucide-react';
import type { ComponentType } from 'react';
import type { ProfileTab } from './profile-page.types.ts';

export const DEFAULT_TAB: ProfileTab = 'profile';

export const PROFILE_TABS: Array<{
    value: ProfileTab;
    label: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
}> = [
    {
        value: 'profile',
        label: 'Profile',
        description: 'Basic user information',
        icon: UserRound,
    },
    {
        value: 'preferences',
        label: 'Preferences',
        description: 'Application settings',
        icon: SlidersHorizontal,
    },
    {
        value: 'security',
        label: 'Security',
        description: 'Account security actions',
        icon: Shield,
    },
];
