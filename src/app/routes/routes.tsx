import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/shared/components/layout';
import { RegisterPage } from '../../shared/modules/auth/registration/registration-page.tsx';
import { ROUTES } from './common/routes.constants.ts';
import { TasksPage } from '@/pages/tasks-page';
import { TasksDetailsPage } from '@/pages/tasks-details-page';
import { LoginPage } from '../../shared/modules/auth/login/login-page.tsx';
import { ProtectedRoute } from './common/protected-route.tsx';
import { PublicOnlyRoute } from './common/public-route.tsx';

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
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Layout />,
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
                ],
            },
        ],
    },
]);
