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
import { type LoginFormValues, loginSchema } from '../../auth.schema.ts';

interface LoginFormProps {
    isSubmitting: boolean;
    onSubmit: (values: LoginFormValues) => void | Promise<void>;
}

export function LoginForm({ isSubmitting, onSubmit }: LoginFormProps) {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Sign in to your account.</CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="login-form"
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
                                    <FieldLabel htmlFor="login-email">Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        disabled={isSubmitting}
                                        aria-invalid={fieldState.invalid}
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
                                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-password"
                                        type="password"
                                        aria-label="type"
                                        placeholder="Your password"
                                        disabled={isSubmitting}
                                        aria-invalid={fieldState.invalid}
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
                <Button type="submit" form="login-form" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in
                </Button>
            </CardFooter>
        </Card>
    );
}
