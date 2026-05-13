import { KeyRound, Loader2, MailCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../../../../shared/components/shadcn/ui/alert.tsx';
import { Button } from '../../../../../shared/components/shadcn/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../shared/components/shadcn/ui/card.tsx';
import { useRequestPasswordReset } from './model/hooks/useRequestPasswordReset.ts';

export function ProfileSecurityPage() {
    const { isRequesting, response, requestPasswordReset } = useRequestPasswordReset();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage account security actions.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-medium">Change password</h3>
                            <p className="text-sm text-muted-foreground">
                                Generate a password reset link for your account. The link can be
                                used once and expires automatically.
                            </p>
                        </div>

                        <Button
                            type="button"
                            disabled={isRequesting || Boolean(response)}
                            onClick={() => void requestPasswordReset()}
                        >
                            {isRequesting ? (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                            ) : (
                                <KeyRound className="mr-2 size-4" />
                            )}
                            Change password
                        </Button>
                    </div>
                </div>

                {response && (
                    <Alert>
                        <MailCheck className="size-4" />
                        <AlertTitle>Password reset link generated</AlertTitle>
                        <AlertDescription>
                            <div className="space-y-2">
                                <p>
                                    Password reset flow was started successfully. Email system is
                                    not connected so far, this is just for testing purposes
                                </p>

                                {response.resetUrl && (
                                    <Button asChild variant="outline" size="sm">
                                        <Link to={response.resetUrl}>Open reset password page</Link>
                                    </Button>
                                )}
                            </div>
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
