import type { Nullable } from '../../../../../../../shared/types/common.ts';

type ProfileCompletenessField = keyof ProfileCompletenessValues;

interface ProfileCompletenessValues {
    avatarUrl?: Nullable<string>;
    name?: Nullable<string>;
    surname?: Nullable<string>;
    birthday?: Nullable<string | Date>;
}

interface CalculateProfileCompletenessParams {
    user: ProfileCompletenessValues;
    formValues?: Partial<ProfileCompletenessValues>;
}

const profileCompletenessFields: ProfileCompletenessField[] = [
    'avatarUrl',
    'name',
    'surname',
    'birthday',
];

function isFieldComplete(value: unknown): boolean {
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }

    return Boolean(value);
}

export function calculateProfileCompleteness({
    user,
    formValues = {},
}: CalculateProfileCompletenessParams) {
    const completedFieldsCount = profileCompletenessFields.reduce((count, field) => {
        const value = formValues[field] ?? user[field];

        return isFieldComplete(value) ? count + 1 : count;
    }, 0);

    return Math.round((completedFieldsCount / profileCompletenessFields.length) * 100);
}
