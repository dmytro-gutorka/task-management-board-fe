import { PROFILE_ROUTE_SEGMENTS } from '../../../shared/constants/routes/profile.routes.ts';

export const PROFILE_TABS = {
    DETAILS: 'details',
    PREFERENCES: 'preferences',
    SECURITY: 'security',
} satisfies Partial<typeof PROFILE_ROUTE_SEGMENTS>;
