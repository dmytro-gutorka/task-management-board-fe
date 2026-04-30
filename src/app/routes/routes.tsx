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
        element: <PublicOnlyRoute />,
        children: [
            {
                path: ROUTES.LOGIN_PAGE,
                Component: LoginPage,
            },
            {
                path: ROUTES.REGISTRATION_PAGE,
                Component: RegisterPage,
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: ROUTES.HOME,
                Component: Layout,
                children: [
                    {
                        index: true,
                        Component: TasksPage,
                    },
                    {
                        path: ROUTES.TASKS_PAGE,
                        Component: TasksPage,
                    },
                    {
                        path: ROUTES.TASKS_DETAILS_PAGE,
                        Component: TasksDetailsPage,
                    },
                ],
            },
        ],
    },
]);
