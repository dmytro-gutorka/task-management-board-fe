import {
    PROFILE_ROUTE_SEGMENTS,
    PROFILE_ROUTES,
} from '../../../shared/constants/routes/profile.routes.ts';
import type { ProfileTab } from './profile-page.types.ts';

export const PROFILE_TABS = {
    DETAILS: 'details',
    PREFERENCES: 'preferences',
    SECURITY: 'security',
} satisfies Partial<typeof PROFILE_ROUTE_SEGMENTS>;

export const tabRoutes: Record<ProfileTab, string> = {
    details: PROFILE_ROUTES.PROFILE_DETAILS_PAGE,
    preferences: PROFILE_ROUTES.PROFILE_PREFERENCES_PAGE,
    security: PROFILE_ROUTES.PROFILE_SECURITY_PAGE,
};
