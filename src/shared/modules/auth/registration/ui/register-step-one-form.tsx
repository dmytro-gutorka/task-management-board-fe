import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../components/shadcn/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../../../components/shadcn/ui/card.tsx';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '../../../../components/shadcn/ui/field.tsx';
import { Input } from '../../../../components/shadcn/ui/input.tsx';
import { registerStepOneSchema, type RegisterStepOneValues } from '../../auth.schema.ts';

interface RegisterStepOneFormProps {
    isSubmitting: boolean;
    onSubmit: (values: RegisterStepOneValues) => void | Promise<void>;
}

export function RegisterStepOneForm({ isSubmitting, onSubmit }: RegisterStepOneFormProps) {
    const form = useForm<RegisterStepOneValues>({
        resolver: zodResolver(registerStepOneSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create your account.</CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="register-step-one-form"
                    onSubmit={(event) => {
                        void form.handleSubmit(onSubmit)(event);
                    }}
                >
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-email">Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id="register-email"
                                        type="email"
                                        disabled={isSubmitting}
                                        aria-label="type"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-password">Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id="register-password"
                                        type="password"
                                        disabled={isSubmitting}
                                        aria-label="type"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-confirm-password">
                                        Confirm password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="register-confirm-password"
                                        type="password"
                                        disabled={isSubmitting}
                                        aria-label="type"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    type="submit"
                    form="register-step-one-form"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Continue
                </Button>
            </CardFooter>
        </Card>
    );
}
