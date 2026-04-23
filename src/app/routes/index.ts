import { createBrowserRouter } from 'react-router-dom';
import { TasksPage } from '@/pages/tasks/TasksPage/TasksPage';
import { Layout } from '@/shared/components/layout';
import { TaskDetailsPage } from '@/pages/tasks/TasksPage/TaskDetailsPage';

export const router = makeRouter();

function makeRouter() {
    return createBrowserRouter([
        {
            Component: Layout,
            path: '/',
            children: [
                {
                    path: '/tasks',
                    Component: TasksPage,
                },
                {
                    path: '/task/:taskId',
                    Component: TaskDetailsPage,
                },
            ],
        },
    ]);
}
