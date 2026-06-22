import { format } from 'date-fns';
import type { UserDto, UserListItemDto, UserDetailsDto } from './user-api.types-dto.ts';
import type { User, UserListItem, UserDetails } from './user-api.types-domain.ts';
import type { PagePaginationResponse } from '../../../types/common.ts';

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
        permissions: dto.permissions ?? [],
        roles: dto.roles ?? [],
    };
}

export function mapUserListItemDtoToUserListItem(dto: UserListItemDto): UserListItem {
    return {
        id: dto.id,
        email: dto.email,
        name: dto.name ?? '',
        surname: dto.surname ?? '',
        roles: dto.roles ?? [],
        createdAt: new Date(dto.createdAt),
    };
}

export function mapUserDetailsDtoToUserDetails(dto: UserDetailsDto): UserDetails {
    return mapUserDtoToUser(dto);
}

export function mapPagePaginatedResponseDto<TDto, TDomain>(
    dto: PagePaginationResponse<TDto>,
    itemMapper: (item: TDto) => TDomain,
): PagePaginationResponse<TDomain> {
    return {
        items: dto.items.map(itemMapper),
        page: dto.page,
        limit: dto.limit,
        total: dto.total,
        totalPages: dto.totalPages,
    };
}
