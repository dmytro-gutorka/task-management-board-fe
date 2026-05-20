import { KeyRound, Link2, Loader2 } from 'lucide-react';
import { GoogleAuthButton } from '../../../../../shared/components/google-auth-button.tsx';
import { Button } from '../../../../../shared/components/shadcn/ui/button.tsx';
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
import { SecurityPageAlert } from './ui/security-page-alert.tsx';
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
                <SecurityPageAlert
                    isSuccess={isPasswordResetRequestSuccess}
                    title="Check your email"
                    description="We sent a password reset link to your email address."
                />
                <SecurityPageAlert
                    isSuccess={isGoogleLinkSuccess}
                    title="Google account linked"
                    description="You can now sign in to this account with Google."
                />
                <SecurityPageAlert
                    isSuccess={isSetPasswordSuccess}
                    title="Password set"
                    description="You can now sign in to this account with email and password."
                />
            </div>

            <CardContent className="space-y-4">
                <PrimaryEmailSelector
                    options={primaryEmailOptions}
                    isLoading={isLoadingPrimaryEmailOptions}
                    isUpdating={isUpdatingPrimaryEmail}
                    onUpdate={updatePrimaryEmail}
                />

                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-sm font-medium">Change password</CardTitle>
                            <CardDescription>
                                Generate a password reset link for your account. The link can be
                                used once and expires automatically.
                            </CardDescription>
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
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                <Link2 className="size-4" />
                                Link Google account
                            </CardTitle>
                            <CardDescription>
                                Connect a Google account to this profile. The Google email may be
                                different because you are already signed in to this account.
                            </CardDescription>
                        </div>

                        <div className="w-full md:max-w-64">
                            <GoogleAuthButton
                                text="continue_with"
                                onCredential={linkGoogleAccount}
                            />
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Set local password</CardTitle>
                        <CardDescription>
                            Use this if your account was created with Google and you want to also
                            sign in with email and password.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <SetLocalPasswordForm
                            isSubmitting={isSettingPassword}
                            isSuccess={isSetPasswordSuccess}
                            onSubmit={setLocalPassword}
                        />
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
