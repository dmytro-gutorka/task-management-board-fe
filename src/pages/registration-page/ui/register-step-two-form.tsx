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
    registerStepTwoSchema,
    type RegisterStepTwoValues,
} from '../../../shared/modules/auth/auth.schema.ts';

interface RegisterStepTwoFormProps {
    isSubmitting: boolean;
    onSubmit: (values: RegisterStepTwoValues) => void | Promise<void>;
    onSkip: () => void;
}

export function RegisterStepTwoForm({ isSubmitting, onSubmit, onSkip }: RegisterStepTwoFormProps) {
    const { t } = useTranslation(['auth']);

    const form = useForm<RegisterStepTwoValues>({
        resolver: zodResolver(registerStepTwoSchema),
        defaultValues: {
            name: '',
            surname: '',
            birthday: '',
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {t('register.form-labels.second-step.form-header', {
                        ns: 'auth',
                    })}
                </CardTitle>
                <CardDescription>
                    {t('register.form-labels.second-step.form-description', {
                        ns: 'auth',
                    })}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="register-step-two-form"
                    onSubmit={(event) => {
                        void form.handleSubmit(onSubmit)(event);
                    }}
                >
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-name">
                                        {' '}
                                        {t('register.input-labels.second-step.name', {
                                            ns: 'auth',
                                        })}
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="register-name"
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
                            name="surname"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-surname">
                                        {' '}
                                        {t('register.input-labels.second-step.surname', {
                                            ns: 'auth',
                                        })}
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="register-surname"
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
                            name="birthday"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-birthday">
                                        {t('register.input-labels.second-step.birthday', {
                                            ns: 'auth',
                                        })}
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="register-birthday"
                                        type="date"
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

            <CardFooter className="gap-6 flex flex-col">
                <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={onSkip}
                    className="w-full"
                    variant="outline"
                >
                    {t('common.buttons.skip', {
                        ns: 'auth',
                    })}
                </Button>
                <Button
                    type="submit"
                    form="register-step-two-form"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('common.buttons.finish', {
                        ns: 'auth',
                    })}
                </Button>
            </CardFooter>
        </Card>
    );
}
