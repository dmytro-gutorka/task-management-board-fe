import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormFieldController } from '../../../../../../shared/components/form-field-controller.tsx';
import { Button } from '../../../../../../shared/components/shadcn/ui/button.tsx';
import { FieldGroup } from '../../../../../../shared/components/shadcn/ui/field.tsx';
import {
    setLocalPasswordSchema,
    type SetLocalPasswordFormValues,
} from '../model/set-local-password.schema.ts';

interface SetLocalPasswordFormProps {
    isSubmitting: boolean;
    isSuccess: boolean;
    onSubmit: (values: SetLocalPasswordFormValues) => Promise<void>;
}

export function SetLocalPasswordForm({
    isSubmitting,
    isSuccess,
    onSubmit,
}: SetLocalPasswordFormProps) {
    const form = useForm<SetLocalPasswordFormValues>({
        resolver: zodResolver(setLocalPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    return (
        <form
            className="space-y-4"
            onSubmit={(event) => {
                void form.handleSubmit(onSubmit)(event);
            }}
        >
            <FieldGroup>
                <FormFieldController
                    control={form.control}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                />

                <FormFieldController
                    control={form.control}
                    name="confirmPassword"
                    type="password"
                    label="Confirm password"
                    placeholder="Repeat password"
                />
            </FieldGroup>

            <Button
                type="submit"
                disabled={isSubmitting || isSuccess || !form.formState.isValid}
                className="w-full md:w-auto"
            >
                {isSubmitting ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                    <KeyRound className="mr-2 size-4" />
                )}
                Set password
            </Button>
        </form>
    );
}
