import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/components/shadcn/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../../shared/components/shadcn/ui/card.tsx';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '../../../shared/components/shadcn/ui/field.tsx';
import { Input } from '../../../shared/components/shadcn/ui/input.tsx';
import {
    registerStepOneSchema,
    type RegisterStepOneValues,
} from '../../../shared/infrastructure/auth/auth.schema.ts';

interface RegisterStepOneFormProps {
    isSubmitting: boolean;
    onSubmit: (values: RegisterStepOneValues) => void | Promise<void>;
}

export function RegisterStepOneForm({ isSubmitting, onSubmit }: RegisterStepOneFormProps) {
    const { t } = useTranslation(['auth']);

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
                <CardTitle>
                    {t('register.form-labels.first-step.form-header', { ns: 'auth' })}
                </CardTitle>
                <CardDescription>
                    {t('register.form-labels.first-step.form-header', { ns: 'auth' })}
                </CardDescription>
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
                                    <FieldLabel htmlFor="register-email">
                                        {t('common.input-labels.email', { ns: 'auth' })}
                                    </FieldLabel>
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
                                    <FieldLabel htmlFor="register-password">
                                        {t('common.input-labels.password', { ns: 'auth' })}
                                    </FieldLabel>
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
                                        {t('register.input-labels.first-step.confirm-password', {
                                            ns: 'auth',
                                        })}
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
                    {t('common.buttons.continue', {
                        ns: 'auth',
                    })}
                </Button>
            </CardFooter>
        </Card>
    );
}
