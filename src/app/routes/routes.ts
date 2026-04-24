import { createBrowserRouter } from 'react-router-dom';
import { TasksPage } from '@/pages/tasks/TasksPage/TasksPage';
import { Layout } from '@/shared/components/layout';
import { TaskDetailsPage } from '@/pages/tasks/TasksPage/TaskDetailsPage';
import { ROUTES } from '@/app/routes/routes.constants';

export const router = makeRouter();

function makeRouter() {
    return createBrowserRouter([
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
                    Component: TaskDetailsPage,
                },
            ],
        },
    ]);
}
