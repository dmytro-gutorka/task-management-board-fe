import {
    PROFILE_ROUTE_SEGMENTS,
    PROFILE_ROUTES,
} from '../../../shared/constants/routes/profile.routes.ts';
import {
    ProfilePage,
    ProfileDetailsPage,
    ProfilePreferencesPage,
    ProfileSecurityPage,
} from '../../../pages/profile-page';
import { Navigate } from 'react-router-dom';

export const profileRoutes = [
    {
        path: PROFILE_ROUTES.PROFILE_PAGE,
        element: <ProfilePage />,
        children: [
            {
                index: true,
                element: <Navigate to={PROFILE_ROUTE_SEGMENTS.DETAILS} replace />,
            },
            {
                path: PROFILE_ROUTE_SEGMENTS.DETAILS,
                element: <ProfileDetailsPage />,
            },
            {
                path: PROFILE_ROUTE_SEGMENTS.PREFERENCES,
                element: <ProfilePreferencesPage />,
            },
            {
                path: PROFILE_ROUTE_SEGMENTS.SECURITY,
                element: <ProfileSecurityPage />,
            },
        ],
    },
];
