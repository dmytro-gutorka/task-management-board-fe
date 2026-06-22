import { tasksRoutes } from './tasks.routes.tsx';
import { ProtectedRoute } from '../custom-routes/protected-route.tsx';
import { profileRoutes } from './profile.routes.tsx';

export const protectedRoutes = [
    {
        element: <ProtectedRoute />,
        children: [...tasksRoutes, ...profileRoutes],
    },
];
