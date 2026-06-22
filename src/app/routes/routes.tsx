import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../../shared/components/layout.tsx';
import { GENERAL_ROUTES } from '../../shared/constants/routes/general.routes.ts';
import { publicRoutes } from './route-groups/public.routes.tsx';
import { protectedRoutes } from './route-groups/protected.routes.tsx';
import { adminRoutes } from './route-groups/admin.routes.tsx';

export const router = createBrowserRouter([
    {
        path: GENERAL_ROUTES.HOME,
        element: <Layout />,
        children: [...publicRoutes, ...protectedRoutes, ...adminRoutes],
    },
]);
