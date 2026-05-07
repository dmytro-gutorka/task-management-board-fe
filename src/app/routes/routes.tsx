import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/shared/components/layout';
import { LoginPage } from '../../pages/login-page';
import { ProfilePage } from '../../pages/profile-page/ui/profile-page.tsx';
import { RegisterPage } from '../../pages/registration-page';
import { ROUTES } from '../../shared/constants/routes.constants.ts';
import { TasksPage } from '@/pages/tasks-page';
import { TasksDetailsPage } from '@/pages/tasks-details-page';
import { ProtectedRoute } from './custom-routes/protected-route.tsx';
import { PublicOnlyRoute } from './custom-routes/public-route.tsx';

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Layout />,
        children: [
            {
                element: <PublicOnlyRoute />,
                children: [
                    {
                        path: ROUTES.LOGIN_PAGE,
                        element: <LoginPage />,
                    },
                    {
                        path: ROUTES.REGISTRATION_PAGE,
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
                        path: ROUTES.TASKS_PAGE,
                        element: <TasksPage />,
                    },
                    {
                        path: ROUTES.TASKS_DETAILS_PAGE,
                        element: <TasksDetailsPage />,
                    },
                    {
                        path: ROUTES.PROFILE_PAGE,
                        element: <ProfilePage />,
                    },
                ],
            },
        ],
    },
]);
