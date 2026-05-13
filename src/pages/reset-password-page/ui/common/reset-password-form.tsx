import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormFieldController } from '../../../../shared/components/form-field-controller.tsx';
import { Button } from '../../../../shared/components/shadcn/ui/button.tsx';
import { FieldGroup } from '../../../../shared/components/shadcn/ui/field.tsx';
import { resetPasswordFormDefaultValues } from '../../model/reset-password.constants.ts';
import { resetPasswordSchema } from '../../model/reset-password.schema.ts';
import type { ResetPasswordFormValues } from '../../model/reset-password.types.ts';
import { ResetPasswordCardLayout } from './reset-password-card-layout.tsx';

interface ResetPasswordFormProps {
    isConfirming: boolean;
    onSubmit: (values: ResetPasswordFormValues) => Promise<void>;
}

export function ResetPasswordForm({ isConfirming, onSubmit }: ResetPasswordFormProps) {
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onChange',
        defaultValues: resetPasswordFormDefaultValues,
    });

    return (
        <ResetPasswordCardLayout
            title="Reset password"
            description="Enter a new password for your account."
        >
            <form
                className="space-y-4"
                onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
            >
                <FieldGroup>
                    <FormFieldController
                        control={form.control}
                        name="newPassword"
                        label="New password"
                        type="password"
                        placeholder="Enter new password"
                    />

                    <FormFieldController
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm password"
                        type="password"
                        placeholder="Repeat new password"
                    />
                </FieldGroup>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isConfirming || !form.formState.isValid}
                >
                    {isConfirming ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                        <KeyRound className="mr-2 size-4" />
                    )}
                    Reset password
                </Button>
            </form>
        </ResetPasswordCardLayout>
    );
}
