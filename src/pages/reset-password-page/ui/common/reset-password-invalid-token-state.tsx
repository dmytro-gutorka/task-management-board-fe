import { TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../../../shared/components/shadcn/ui/alert.tsx';
import { Button } from '../../../../shared/components/shadcn/ui/button.tsx';
import { GENERAL_ROUTES } from '../../../../shared/constants/routes/general.routes.ts';
import { ResetPasswordCardLayout } from './reset-password-card-layout.tsx';

export function ResetPasswordInvalidTokenState() {
    return (
        <ResetPasswordCardLayout
            title="Reset password"
            description="The reset link is invalid because the token is missing."
        >
            <Alert variant="destructive">
                <TriangleAlert className="size-4" />
                <AlertTitle>Invalid reset link</AlertTitle>
                <AlertDescription>
                    Please request a new password reset link from your profile security settings.
                </AlertDescription>
            </Alert>

            <Button asChild className="w-full">
                <Link to={GENERAL_ROUTES.LOGIN_PAGE}>Back to login</Link>
            </Button>
        </ResetPasswordCardLayout>
    );
}
