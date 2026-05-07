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
    registerStepTwoSchema,
    type RegisterStepTwoValues,
} from '../../../shared/infrastructure/auth/auth.schema.ts';
import { registrationFormTwoOneDefaultValues } from '../model/registration.constants.ts';

interface RegisterStepTwoFormProps {
    isSubmitting: boolean;
    onSubmit: (values: RegisterStepTwoValues) => void | Promise<void>;
    onSkip: () => void;
}

export function RegisterStepTwoForm({ isSubmitting, onSubmit, onSkip }: RegisterStepTwoFormProps) {
    const { t } = useTranslation(['auth']);

    const form = useForm<RegisterStepTwoValues>({
        resolver: zodResolver(registerStepTwoSchema),
        defaultValues: registrationFormTwoOneDefaultValues,
    });

    return (
        <AuthFormCard
            title={t('register.form-labels.second-step.form-header', {
                ns: 'auth',
            })}
            description={t('register.form-labels.second-step.form-description', {
                ns: 'auth',
            })}
        >
            <form
                id="register-step-two-form"
                onSubmit={(event) => {
                    void form.handleSubmit(onSubmit)(event);
                }}
            >
                <FieldGroup>
                    <FormFieldController
                        control={form.control}
                        name="name"
                        label={t('register.input-labels.second-step.name', {
                            ns: 'auth',
                        })}
                    />
                    <FormFieldController
                        control={form.control}
                        name="surname"
                        label={t('register.input-labels.second-step.surname', {
                            ns: 'auth',
                        })}
                    />
                    <FormFieldController
                        control={form.control}
                        name="birthday"
                        type="date"
                        label={t('register.input-labels.second-step.birthday', {
                            ns: 'auth',
                        })}
                    />
                </FieldGroup>
            </form>

            <CardFooter>
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
        </AuthFormCard>
    );
}
