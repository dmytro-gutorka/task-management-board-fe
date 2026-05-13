import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ResetPasswordPage } from '../../pages/reset-password-page';
import { Layout } from '../../shared/components/layout.tsx';
import { LoginPage } from '../../pages/login-page';
import {
    ProfileDetailsPage,
    ProfilePage,
    ProfilePreferencesPage,
    ProfileSecurityPage,
} from '../../pages/profile-page';

import { RegisterPage } from '../../pages/registration-page';
import { GENERAL_ROUTES } from '../../shared/constants/routes/general.routes.ts';
import { TasksPage } from '../../pages/tasks-page';
import { TasksDetailsPage } from '../../pages/tasks-details-page';
import {
    PROFILE_ROUTE_SEGMENTS,
    PROFILE_ROUTES,
} from '../../shared/constants/routes/profile.routes.ts';
import { TASKS_ROUTES } from '../../shared/constants/routes/tasks.routes.ts';
import { ProtectedRoute } from './custom-routes/protected-route.tsx';
import { PublicOnlyRoute } from './custom-routes/public-route.tsx';

export const router = createBrowserRouter([
    {
        path: GENERAL_ROUTES.HOME,
        element: <Layout />,
        children: [
            {
                path: GENERAL_ROUTES.RESET_PASSWORD_PAGE,
                element: <ResetPasswordPage />,
            },
            {
                element: <PublicOnlyRoute />,
                children: [
                    {
                        path: GENERAL_ROUTES.LOGIN_PAGE,
                        element: <LoginPage />,
                    },
                    {
                        path: GENERAL_ROUTES.REGISTRATION_PAGE,
                        element: <RegisterPage />,
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <TasksPage />,
                    },
                    {
                        path: TASKS_ROUTES.TASKS_PAGE,
                        element: <TasksPage />,
                    },
                    {
                        path: TASKS_ROUTES.TASKS_DETAILS_PAGE,
                        element: <TasksDetailsPage />,
                    },
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
                ],
            },
        ],
    },
]);
