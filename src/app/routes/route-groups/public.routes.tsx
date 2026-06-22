import { GENERAL_ROUTES } from '../../../shared/constants/routes/general.routes.ts';
import { ResetPasswordPage } from '../../../pages/reset-password-page';
import { PublicOnlyRoute } from '../custom-routes/public-route.tsx';
import { LoginPage } from '../../../pages/login-page';
import { RegisterPage } from '../../../pages/registration-page';

export const publicRoutes = [
    {
        path: GENERAL_ROUTES.RESET_PASSWORD_PAGE,
        element: <ResetPasswordPage />,
    },
    {
        element: <PublicOnlyRoute />,
        children: [
            {
                path: GENERAL_ROUTES.LOGIN_PAGE,
                element: <LoginPage />,
            },
            {
                path: GENERAL_ROUTES.REGISTRATION_PAGE,
                element: <RegisterPage />,
            },
        ],
    },
];
