import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormFieldController } from '../../../../../../shared/components/form-field-controller.tsx';
import { Alert, AlertDescription } from '../../../../../../shared/components/shadcn/ui/alert.tsx';
import { Button } from '../../../../../../shared/components/shadcn/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../../shared/components/shadcn/ui/card.tsx';
import { FieldGroup } from '../../../../../../shared/components/shadcn/ui/field.tsx';
import type { User } from '../../../../../../shared/modules/users/user-api.types-domain.ts';
import { profileFormSchema, type ProfileFormValues } from '../../../../model/profile.schema.ts';

function mapUserToFormValues(user: User): ProfileFormValues {
    return {
        name: user.name ?? '',
        surname: user.surname ?? '',
        birthday: user.birthday ?? '',
    };
}

interface ProfileFormProps {
    user: User;
    isSubmitting: boolean;
    isSubmitSuccess: boolean;
    onSubmit: (values: ProfileFormValues) => Promise<void>;
}

export function ProfileForm({ user, isSubmitting, isSubmitSuccess, onSubmit }: ProfileFormProps) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: mapUserToFormValues(user),
        mode: 'onChange',
    });

    const isDirty = form.formState.isDirty;
    const isValid = form.formState.isValid;

    useEffect(() => {
        form.reset(mapUserToFormValues(user));
    }, [form, user]);

    function handleCancel() {
        form.reset(mapUserToFormValues(user));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal information</CardTitle>
                <CardDescription>Update your basic profile information.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {isDirty && (
                    <Alert>
                        <AlertDescription>You have unsaved changes.</AlertDescription>
                    </Alert>
                )}

                {isSubmitSuccess && !isDirty && (
                    <Alert>
                        <AlertDescription>Profile was successfully updated.</AlertDescription>
                    </Alert>
                )}

                <form
                    id="profile-form"
                    onSubmit={(event) => {
                        void form.handleSubmit(onSubmit)(event);
                    }}
                >
                    <FieldGroup>
                        <FormFieldController
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                        />

                        <FormFieldController
                            control={form.control}
                            name="surname"
                            label="Surname"
                            placeholder="Enter your surname"
                        />

                        <FormFieldController
                            control={form.control}
                            name="birthday"
                            type="date"
                            label="Birthday"
                        />
                    </FieldGroup>
                </form>

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={!isDirty || isSubmitting}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        form="profile-form"
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                        Save changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
