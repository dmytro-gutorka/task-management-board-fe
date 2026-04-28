import { createBrowserRouter } from 'react-router-dom';
import { TasksPage } from '@/pages/tasks-page/tasks-page';
import { Layout } from '@/shared/components/layout';
import { TasksDetailsPage } from '@/pages/tasks-details-page/tasks-details-page';
import { ROUTES } from '@/app/routes/routes.constants';

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
