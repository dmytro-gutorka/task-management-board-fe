import { createBrowserRouter } from 'react-router-dom';
import { TasksPage } from '@/pages/tasks/TasksPage/TasksPage';
import { HomePage } from '@/pages/tasks/HomePage/HomePage';

export const router = makeRouter();

function makeRouter() {
    return createBrowserRouter([
        {
            path: '/',
            Component: HomePage,
        },
        {
            path: '/tasks',
            Component: TasksPage,
        },
    ]);
}
