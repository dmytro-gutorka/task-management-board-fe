import { buildPermissionKey } from './helpers/buildPermissionKey.ts';
import type { PermissionResource, PermissionAction, PermissionKey } from './permissions.types.ts';
import { PermissionResources, PermissionActions } from './permissions.constants.ts';

export const PERMISSIONS = {
    [PermissionResources.TASKS]: {
        [PermissionActions.CREATE]: buildPermissionKey(
            PermissionResources.TASKS,
            PermissionActions.CREATE,
        ),
        [PermissionActions.READ]: buildPermissionKey(
            PermissionResources.TASKS,
            PermissionActions.READ,
        ),
        [PermissionActions.UPDATE]: buildPermissionKey(
            PermissionResources.TASKS,
            PermissionActions.UPDATE,
        ),
        [PermissionActions.DELETE]: buildPermissionKey(
            PermissionResources.TASKS,
            PermissionActions.DELETE,
        ),
    },
    [PermissionResources.USERS]: {
        [PermissionActions.CREATE]: buildPermissionKey(
            PermissionResources.USERS,
            PermissionActions.CREATE,
        ),
        [PermissionActions.READ]: buildPermissionKey(
            PermissionResources.USERS,
            PermissionActions.READ,
        ),
        [PermissionActions.UPDATE]: buildPermissionKey(
            PermissionResources.USERS,
            PermissionActions.UPDATE,
        ),
        [PermissionActions.DELETE]: buildPermissionKey(
            PermissionResources.USERS,
            PermissionActions.DELETE,
        ),
    },
} as const satisfies Record<PermissionResource, Record<PermissionAction, PermissionKey>>;
