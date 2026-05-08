type ProfileCompletenessField = keyof ProfileCompletenessValues;

interface ProfileCompletenessValues {
    avatarUrl?: string | null;
    name?: string | null;
    surname?: string | null;
    birthday?: string | Date | null;
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
