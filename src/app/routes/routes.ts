import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/shared/components/layout';
import { ROUTES } from '@/app/routes/routes.constants';
import { TasksPage } from '@/pages/tasks-page';
import { TasksDetailsPage } from '@/pages/tasks-details-page';

export const router = createBrowserRouter([
    {
        Component: Layout,
        path: ROUTES.HOME,
        children: [
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
]);
