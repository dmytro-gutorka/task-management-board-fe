import type { User } from '../../../../../../../../../shared/modules/users/api/user-api.types-domain.ts';

export function getInitials(user: User) {
    if (!user.name || !user.surname) return ';...;';

    return user.name.charAt(0).toUpperCase() + user.surname.charAt(0).toUpperCase();
}
