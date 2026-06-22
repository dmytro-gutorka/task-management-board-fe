import { TASKS_ROUTES } from '../../../shared/constants/routes/tasks.routes.ts';
import { TasksPage } from '../../../pages/tasks-page';
import { TasksDetailsPage } from '../../../pages/tasks-details-page';

export const tasksRoutes = [
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
];
