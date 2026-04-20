import { createBrowserRouter } from 'react-router-dom';
import { TasksPage } from '@/pages/tasks/TasksPage/TasksPage';
import { HomePage } from '@/pages/tasks/HomePage/HomePage';
import { Layout } from '@/shared/components/layout';

export const router = makeRouter();

function makeRouter() {
    return createBrowserRouter([
        {
            Component: Layout,
            path: '/',
            children: [
                {
                    path: '/',
                    Component: HomePage,
                },
                {
                    path: '/tasks',
                    Component: TasksPage,
                },
            ],
        },
    ]);
}
