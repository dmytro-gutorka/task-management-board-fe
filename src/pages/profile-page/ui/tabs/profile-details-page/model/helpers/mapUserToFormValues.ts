import type { User } from '../../../../../../../shared/modules/users/user-api.types-domain.ts';
import type { ProfileFormValues } from '../../../../../model/profile.schema.ts';

export function mapUserToFormValues(user: User): ProfileFormValues {
    return {
        name: user.name ?? '',
        surname: user.surname ?? '',
        birthday: user.birthday ?? '',
    };
}
