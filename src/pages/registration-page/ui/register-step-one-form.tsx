import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthFormCard } from '../../../shared/components/auth-form-card.tsx';
import { FormFieldController } from '../../../shared/components/form-field-controller.tsx';
import { Button } from '../../../shared/components/shadcn/ui/button.tsx';
import { CardFooter } from '../../../shared/components/shadcn/ui/card.tsx';
import { FieldGroup } from '../../../shared/components/shadcn/ui/field.tsx';
import {
    registerStepOneSchema,
    type RegisterStepOneValues,
} from '../../../shared/infrastructure/auth/auth.schema.ts';
import { registrationFormStepOneDefaultValues } from '../model/registration.constants.ts';

interface RegisterStepOneFormProps {
    isSubmitting: boolean;
    onSubmit: (values: RegisterStepOneValues) => void | Promise<void>;
}

export function RegisterStepOneForm({ isSubmitting, onSubmit }: RegisterStepOneFormProps) {
    const { t } = useTranslation(['auth']);

    const form = useForm<RegisterStepOneValues>({
        resolver: zodResolver(registerStepOneSchema),
        defaultValues: registrationFormStepOneDefaultValues,
    });

    return (
        <AuthFormCard
            title={t('register.form-labels.first-step.form-header', { ns: 'auth' })}
            description={t('register.form-labels.first-step.form-description', { ns: 'auth' })}
        >
            <form
                id="register-step-one-form"
                onSubmit={(event) => {
                    void form.handleSubmit(onSubmit)(event);
                }}
            >
                <FieldGroup>
                    <FormFieldController
                        control={form.control}
                        name="email"
                        type="email"
                        label={t('common.input-labels.email', { ns: 'auth' })}
                    />
                    <FormFieldController
                        control={form.control}
                        name="password"
                        type="password"
                        label={t('common.input-labels.password', { ns: 'auth' })}
                    />
                    <FormFieldController
                        control={form.control}
                        name="confirmPassword"
                        type="password"
                        label={t('register.input-labels.first-step.confirm-password', {
                            ns: 'auth',
                        })}
                    />
                </FieldGroup>
            </form>

            <CardFooter>
                <Button
                    className="w-full"
                    type="submit"
                    form="register-step-one-form"
                    disabled={isSubmitting}
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('common.buttons.continue', {
                        ns: 'auth',
                    })}
                </Button>
            </CardFooter>
        </AuthFormCard>
    );
}
