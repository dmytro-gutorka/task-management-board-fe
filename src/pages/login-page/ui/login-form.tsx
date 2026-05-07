import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormCard } from '../../../shared/components/auth-form-card.tsx';
import { FormFieldController } from '../../../shared/components/form-field-controller.tsx';
import { Button } from '../../../shared/components/shadcn/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { CardFooter } from '../../../shared/components/shadcn/ui/card.tsx';
import { FieldGroup } from '../../../shared/components/shadcn/ui/field.tsx';
import {
    type LoginFormValues,
    loginSchema,
} from '../../../shared/infrastructure/auth/auth.schema.ts';
import { loginFormDefaultValues } from '../model/login.constants.ts';

interface LoginFormProps {
    isSubmitting: boolean;
    onSubmit: (values: LoginFormValues) => void | Promise<void>;
}

export function LoginForm({ isSubmitting, onSubmit }: LoginFormProps) {
    const { t } = useTranslation(['auth']);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: loginFormDefaultValues,
    });

    return (
        <AuthFormCard
            title={t('login.form-labels.form-header', { ns: 'auth' })}
            description={t('login.form-labels.form-description', { ns: 'auth' })}
        >
            <form
                id="login-form"
                onSubmit={(event) => {
                    void form.handleSubmit(onSubmit)(event);
                }}
            >
                <FieldGroup>
                    <FormFieldController
                        control={form.control}
                        name="email"
                        label={t('common.input-labels.email', { ns: 'auth' })}
                        placeholder={t('common.placeholders.email', { ns: 'auth' })}
                    />

                    <FormFieldController
                        control={form.control}
                        name="password"
                        type="password"
                        label={t('common.input-labels.password', { ns: 'auth' })}
                        placeholder={t('common.placeholders.password', { ns: 'auth' })}
                    />
                </FieldGroup>
            </form>

            <CardFooter>
                <Button type="submit" form="login-form" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('common.buttons.sign-in', { ns: 'auth' })}
                </Button>
            </CardFooter>
        </AuthFormCard>
    );
}
