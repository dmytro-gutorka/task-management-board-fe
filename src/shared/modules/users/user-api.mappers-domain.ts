import { format } from 'date-fns';
import type { UserDto } from './user-api.types-dto.ts';
import type { User } from './user-api.types-domain.ts';

export function mapUserDtoToUser(dto: UserDto): User {
    return {
        id: dto.id,
        email: dto.email,
        name: dto.name ?? '',
        surname: dto.surname ?? '',
        birthday: dto.birthday ? format(new Date(dto.birthday), 'yyyy-MM-dd') : null,
        avatarUrl: dto.avatarUrl ?? null,
        lastLoginAt: dto.lastLoginAt ? new Date(dto.lastLoginAt) : null,
        createdAt: new Date(dto.createdAt),
        updatedAt: new Date(dto.updatedAt),
    };
}
