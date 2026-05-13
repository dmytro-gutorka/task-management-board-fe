import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../../../shared/components/shadcn/ui/alert.tsx';
import { Button } from '../../../../shared/components/shadcn/ui/button.tsx';
import { GENERAL_ROUTES } from '../../../../shared/constants/routes/general.routes.ts';
import { PROFILE_ROUTES } from '../../../../shared/constants/routes/profile.routes.ts';
import { ResetPasswordCardLayout } from './reset-password-card-layout.tsx';

interface ResetPasswordSuccessStateProps {
    isAuthenticated: boolean;
}

export function ResetPasswordSuccessState({ isAuthenticated }: ResetPasswordSuccessStateProps) {
    return (
        <ResetPasswordCardLayout
            title="Password reset"
            description="Your password has been updated successfully."
        >
            <Alert>
                <CheckCircle2 className="size-4" />
                <AlertTitle>Password updated</AlertTitle>
                <AlertDescription>
                    You can now continue using your account with the new password.
                </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-2 sm:flex-row mt-4">
                {isAuthenticated && (
                    <Button asChild className="flex-1">
                        <Link to={PROFILE_ROUTES.PROFILE_SECURITY_PAGE}>Go to profile</Link>
                    </Button>
                )}

                {!isAuthenticated && (
                    <Button asChild variant="outline" className="flex-1">
                        <Link to={GENERAL_ROUTES.LOGIN_PAGE}>Go to login</Link>
                    </Button>
                )}
            </div>
        </ResetPasswordCardLayout>
    );
}
