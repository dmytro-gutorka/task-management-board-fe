import { CheckCircle2, KeyRound, Loader2 } from 'lucide-react';
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
    const { isRequesting, requestPasswordReset, isSuccess } = useRequestPasswordReset();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage account security actions.</CardDescription>
            </CardHeader>

            <div className="mt-4 px-4">
                {isSuccess && (
                    <Alert>
                        <CheckCircle2 className="size-4" />
                        <AlertTitle>Check your email</AlertTitle>
                        <AlertDescription>
                            We sent a password reset link to your email address.
                        </AlertDescription>
                    </Alert>
                )}
            </div>

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
                            disabled={isRequesting || isSuccess}
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
            </CardContent>
        </Card>
    );
}
