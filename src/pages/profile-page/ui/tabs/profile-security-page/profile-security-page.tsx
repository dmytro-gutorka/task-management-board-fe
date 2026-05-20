import { CheckCircle2, KeyRound, Link2, Loader2 } from 'lucide-react';
import { GoogleAuthButton } from '../../../../../shared/components/google-auth-button.tsx';
import { Button } from '../../../../../shared/components/shadcn/ui/button.tsx';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../../../../shared/components/shadcn/ui/alert.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../shared/components/shadcn/ui/card.tsx';
import { useLinkGoogleAccount } from './model/hooks/useLinkGoogleAccount.ts';
import { usePrimaryEmailOptions } from './model/hooks/usePrimaryEmailOptions.ts';
import { useRequestPasswordReset } from './model/hooks/useRequestPasswordReset.ts';
import { useSetLocalPassword } from './model/hooks/useSetLocalPassword.ts';
import { PrimaryEmailSelector } from './ui/primary-email-selector.tsx';
import { SetLocalPasswordForm } from './ui/set-local-password-form.tsx';

export function ProfileSecurityPage() {
    const {
        isRequesting,
        requestPasswordReset,
        isSuccess: isPasswordResetRequestSuccess,
    } = useRequestPasswordReset();
    const { isSuccess: isGoogleLinkSuccess, linkGoogleAccount } = useLinkGoogleAccount();
    const {
        isSettingPassword,
        isSuccess: isSetPasswordSuccess,
        setLocalPassword,
    } = useSetLocalPassword();
    const {
        primaryEmailOptions,
        isLoadingPrimaryEmailOptions,
        isUpdatingPrimaryEmail,
        updatePrimaryEmail,
    } = usePrimaryEmailOptions();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage account security actions.</CardDescription>
            </CardHeader>

            <div className="mt-4 space-y-3 px-4">
                {isPasswordResetRequestSuccess && (
                    <Alert>
                        <CheckCircle2 className="size-4" />
                        <AlertTitle>Check your email</AlertTitle>
                        <AlertDescription>
                            We sent a password reset link to your email address.
                        </AlertDescription>
                    </Alert>
                )}

                {isGoogleLinkSuccess && (
                    <Alert>
                        <CheckCircle2 className="size-4" />
                        <AlertTitle>Google account linked</AlertTitle>
                        <AlertDescription>
                            You can now sign in to this account with Google.
                        </AlertDescription>
                    </Alert>
                )}

                {isSetPasswordSuccess && (
                    <Alert>
                        <CheckCircle2 className="size-4" />
                        <AlertTitle>Password set</AlertTitle>
                        <AlertDescription>
                            You can now sign in to this account with email and password.
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            <CardContent className="space-y-4">
                <PrimaryEmailSelector
                    options={primaryEmailOptions}
                    isLoading={isLoadingPrimaryEmailOptions}
                    isUpdating={isUpdatingPrimaryEmail}
                    onUpdate={updatePrimaryEmail}
                />

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
                            disabled={isRequesting || isPasswordResetRequestSuccess}
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

                <div className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <h3 className="flex items-center gap-2 text-sm font-medium">
                                <Link2 className="size-4" />
                                Link Google account
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Connect a Google account to this profile. The Google email may be
                                different because you are already signed in to this account.
                            </p>
                        </div>

                        <div className="w-full md:max-w-64">
                            <GoogleAuthButton
                                text="continue_with"
                                onCredential={linkGoogleAccount}
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="text-sm font-medium">Set local password</h3>
                            <p className="text-sm text-muted-foreground">
                                Use this if your account was created with Google and you want to
                                also sign in with email and password.
                            </p>
                        </div>

                        <SetLocalPasswordForm
                            isSubmitting={isSettingPassword}
                            isSuccess={isSetPasswordSuccess}
                            onSubmit={setLocalPassword}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
